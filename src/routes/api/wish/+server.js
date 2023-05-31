import { banner_name } from "$lib/store/wish_history.js"
import { prisma } from "$lib/server/prisma";
import { API_KEY } from "$env/static/private";
import { redirect } from "@sveltejs/kit";
// /** @type {import('./$types').PageServerLoad} */
let wishdata = []
let loading = false
let fetch_status = ''
let wish_history = []
let UniqueData = []
let jsonResponse
let error = ''
let status
let get_wish_history = [];
let counter = 0
let wish_loop = [];
let userID = ""
const url_proxy = 'https://corsproxy.io/?';
const url_head = encodeURIComponent('https://hk4e-api-os.hoyoverse.com/event/gacha_info/api/getGachaLog?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&init_type=301&lang=en&authkey=');
let apikey
export const POST = async ({ locals , request }) => {
    try {
        const { user } = await locals.auth.validateUser();
        const getuser = user.userId;
        userID = getuser
        const get_wish_history = [];
        const body = await request.text();
        const parsedBody = JSON.parse(body);
        apikey = encodeURIComponent(parsedBody)
      // Perform additional operations as needed
      // ...
      await wish() 
      return new Response(JSON.stringify({ message: 'Fetching' }), {
        status: 200
      });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ message: 'Error' }), {
        status: 500
      });
    }
  };
async function wish(
    pointer = "wish_history",
    page_num = 1,
    gacha_type = 301 ,
    end_id = 0,
    previousResponse = []
) {
    console.log('fetching');
    let url_end = encodeURIComponent('&gacha_type=' + gacha_type + '&page=' + page_num + '&size=5&end_id=' + end_id);
    let url_history = url_proxy + url_head + apikey + url_end;
    return fetch(url_history)
    .then(wishinfor => wishinfor.json())
    .then(newwishinfor => {
        if (newwishinfor && newwishinfor.data && newwishinfor.data.list){
            const response = newwishinfor.data.list;
            if (newwishinfor.data.list.length !== 0) {
                if (newwishinfor.data.list.length < 5) {
                    for (let index = 0; index < newwishinfor.data.list.length; index++) {
                        get_wish_history = get_wish_history.concat(newwishinfor.data.list[index]);
                    }
                    if (gacha_type === 301) {
                        page_num = 1;
                        end_id = 0;
                        gacha_type = 302;
                        console.log('from 301 to 302');
                        return wish(pointer = "wish_history", page_num, gacha_type, end_id, response)
                    }
                    else if (gacha_type===302) {
                        page_num = 1;
                        end_id = 0;
                        gacha_type = 200;
                        console.log('from 302 to 200');
                        return wish(pointer = "wish_history", page_num, gacha_type, end_id, response);
                        }
                    else if (gacha_type===200) {
                        console.log('wish history imported successfully');
                        wish_history = get_wish_history
                        map()
                        return wish_history;
                        }
                }
                else{
                    wish_loop = newwishinfor.data.list;
                    get_wish_history = get_wish_history.concat(newwishinfor.data.list);
                    if (page_num === 1) {
                        page_num++;
                        end_id = wish_loop[wish_loop.length - 1].id; 
                        return wish( pointer = "wish_history", page_num, gacha_type, end_id, response);
                    }
                    else{
                        page_num++;
                        end_id = wish_loop[wish_loop.length - 1].id; 
                        return setTimeout(() => {
                            wish( pointer = "wish_history", page_num, gacha_type, end_id, response)
                        }, 50);
                    }
                }
            }
            else{
              if (gacha_type === 301) {
                console.log("else 301");
                    page_num = 1;
                    end_id = 0;
                    gacha_type = 302;
                    console.log('from 301 to 302');
                    return wish(pointer = "wish_history", page_num, gacha_type, end_id, response)
              }
            else if (gacha_type===302) {
              console.log("else 302");
                    page_num = 1;
                    end_id = 0;
                    gacha_type = 200;
                    console.log('from 302 to 200');
                    return wish(pointer = "wish_history", page_num, gacha_type, end_id, response);
                }
            else if (gacha_type===200) {
              console.log("else 200");
                  console.log('wish history imported successfully');
                  wish_history = get_wish_history
                  map()
                  return wish_history;
                }
            }
        } 
        else 
         {
            if(newwishinfor.message == "visit too frequently") {
                error = 'Error: Visit too frequently, try again later'
                fetch_status = 'Import terminated'
                banner_name.set('')
                loading = false
                return error
            }
            else if(newwishinfor.message == "authkey error"){
                error = 'Error: Invalid link unable to retrieve wish history, please try again'
                fetch_status = 'Import terminated'
                banner_name.set('')
                loading = false
                return error;
            }
        }
    });
}

async function map() {
    const data = [...wish_history].reverse()
    let counter = 0
    const Uniquedata = []
    for (const element of data) {
        const unixTimestampSeconds = element.time;
        const date = new Date(unixTimestampSeconds);
        const gachaId = BigInt(element.id);
        const uid = parseInt(element.uid, 10);
        const existingItem = await prisma.wish_history.findUnique({
          where: {
              gacha_id: gachaId,
            },
        });
        if (!existingItem) {
            Uniquedata.push({
            name: element.name,
            gacha_id: gachaId,
            gacha_type: parseInt(element.gacha_type, 10),
            item_type: element.item_type,
            rank_type: parseInt(element.rank_type, 10),
            time: date,
            uid: uid,
            user: {
              connect: { id: userID }
            }
          });
        }
        counter++
      }
    if (Uniquedata.length === 0 ) {
        console.log(
        "---------------------------------------------"+
        "\n"+"no data was updated" + '\n' +
        "---------------------------------------------"+
        "\n"+" -total of "+counter+ " item 0 row affected-"
        );
    }
    else{
        const inserts = Uniquedata.map(d => prisma.wish_history.create({
            data:{
              name: d.name,
              gacha_id: d.gacha_id,
              gacha_type: d.gacha_type,
              item_type: d.item_type,
              rank_type: d.rank_type,
              time: d.time,
              uid: d.uid,
              user: d.user
            }
            }));
        await prisma.$transaction(inserts);
        let apikey = ""

        console.log(
            "---------------------------------------------"+
            "\n"+"Data imported successfully" + '\n' +
            "---------------------------------------------"+
            "\n"+" -total of "+counter+ " item "+ inserts.length + " row is affected-"
            );
    }
  }
//   -------------------------------------test----------------------------------------
// // async function map() {
//     const data = wish_history.map(element => {
//       const unixTimestampSeconds = element.time;
//       const date = new Date(unixTimestampSeconds);
//       return {
//         name: element.name,
//         gacha_id: parseInt(element.id, 10),
//         gacha_type: parseInt(element.gacha_type, 10),
//         item_type: element.item_type,
//         rank_type: parseInt(element.rank_type, 10),
//         time: date,
//         uid: parseInt(element.uid, 10),
//         user: {
//           connect: { id: 1 }
//         }
//       }
//     });
  
//     const inserts = [];
//     for (const d of data) {
//       const existingRow = await prisma.wish_history.findUnique({
//         where: { gacha_id: d.gacha_id }
//       });
//       if (!existingRow) {
//         inserts.push(prisma.wish_history.create({
//             data:{
//             name: d.name,
//             gacha_id: d.gacha_id,
//             gacha_type: d.gacha_type,
//             item_type: d.item_type,
//             rank_type: d.rank_type,
//             time: d.time,
//             uid: d.uid,
//             user: d.user
//         }
//         }));
//       }
//     }
