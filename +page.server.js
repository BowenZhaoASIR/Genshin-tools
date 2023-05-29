export const load = async () => {
    return  {
      wishdata ,
      loading  ,
      status ,
      fetch_status ,
      banner_name ,
      error ,
      wish_history
    }
  }
  let wish_history = []
  let wishdata = []
  let loading = false
  let status = false
  let fetch_status = ''
  let banner_name = ''
  let error = ''
  let get_wish_history = [];
  let wish_loop = [];
  async function wish(
      pointer = "wish_history",
      page_num = 1,
      gacha_type = 301 ,
      end_id = 0,
      previousResponse = []
  ) {
      fetch_status = 'Importing wish history'
      const url_proxy = 'https://corsproxy.io/?';
      const url_head = encodeURIComponent('https://hk4e-api-os.hoyoverse.com/event/gacha_info/api/getGachaLog?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&init_type=301&lang=en&authkey=');
      const url_authkey = encodeURIComponent('apikey')
      let url_end = encodeURIComponent('&gacha_type=' + gacha_type + '&page=' + page_num + '&size=5&end_id=' + end_id);
      let url_history = url_proxy + url_head + url_authkey + url_end;
      return fetch(url_history)
      .then(response => response.json())
      .then(newResponse => {
      if (newResponse && newResponse.data && newResponse.data.list){
          if (gacha_type === 301) {
              banner_name = ': character event banner'
              loading = true
          }
          const response = [...previousResponse, ...newResponse.data.list];
              if (newResponse.length !== 0) {
                  if (newResponse.data.list.length < 5) {
                      for (let index = 0; index < newResponse.data.list.length; index++) {
                          get_wish_history = get_wish_history.concat(newResponse.data.list[index]);
                      }
                      if (gacha_type === 301) {
                      page_num = 1;
                      end_id = 0;
                      gacha_type = 302;
                      banner_name = ': weapon event banner'
                      console.log('from 301 to 302');
                      return wish(pointer = "wish_history", page_num, gacha_type, end_id, response);
                      }
                      else if (gacha_type===302) {
                      page_num = 1;
                      end_id = 0;
                      gacha_type = 200;
                      banner_name = ': permanent banner'
                      console.log('from 302 to 200');
                      return wish(pointer = "wish_history", page_num, gacha_type, end_id, response);
                      }
                      else if (gacha_type===200) {
                      fetch_status = 'wish history imported successfully'
                      banner_name = ''
                      console.log('wish history imported successfully');
                      wish_history = get_wish_history
                      status = true;
                      loading = false
                      map()
                      return wish_history;
                      }
  
                  }
                  else{
                  wish_loop = newResponse.data.list;
                  get_wish_history = get_wish_history.concat(newResponse.data.list);
                  if (page_num === 1) {
                      page_num++;
                      end_id = wish_loop[wish_loop.length - 1].id; 
                      return wish(pointer = "wish_history", page_num, gacha_type, end_id, response);
                  }
                  else{
                      page_num++;
                      end_id = wish_loop[wish_loop.length - 1].id; 
                      return setTimeout(() => {
                          wish(pointer = "wish_history", page_num, gacha_type, end_id, response)
                      }, 50);
                  }
              }
                  }
                  } 
                  else 
                  {
              if(newResponse.message == "visit too frequently") {
                  error = 'Error: Visit too frequently, try again later'
                  fetch_status = 'Import terminated'
                  banner_name = ''
                  loading = false
                  return error
              }
              else if(newResponse.message == "authkey error"){
                  error = 'Error: Invalid link unable to retrieve wish history, please try again'
                  fetch_status = 'Import terminated'
                  banner_name = ''
                  loading = false
                  return error;
              }
          }
       });
      }
  
      function map() {
        wishdata = wish_history.map(element => {
            return {
                wish_id: element.id,
                name: element.name,
                gacha_type: element.gacha_type,
                item_type: element.item_type,
                rank_type: element.rank_type,
                time: element.time,
                uid: element.uid,
            }
            }); 
            console.log(wishdata)
        }

            // async function save_data() {
            //   await prisma.wish_history.createMany({
            //     Data
            //   });  
            // }
            // console.log(Data)