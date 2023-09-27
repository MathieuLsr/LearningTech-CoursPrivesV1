import { IPostForum } from "../../Api/PostForum";

export function fetchPostForum(setListPosts){

    fetch('http://192.168.1.208:3001/api/postforum/get_amount/10')
        .then( async resp =>  {
            
            if(resp.status === 400){
                return ;
            }
            console.log(resp);
            const data = await resp.json();
            console.log(data);
            setListPosts(data)
      
            

        }).catch(err => {
            console.error("Error non génée :",err);
        }) 

}

export function createPost(IDUser, PostTitle, PostBody){

    const post = new IPostForum(IDUser, PostTitle, PostBody)

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(post) 
    }
  
    try{
        fetch('http://192.168.1.208:3001/api/postforum/add', options)
        .then( async resp =>  {
          
          if(resp.status === 400){
            return ;
          }
  
          const data = await resp.json() ;
          console.log(data);
          
        }).catch(err => {
          console.error(err);
        }) 
  
          return ;
    } catch (error) {
      console.error(error);
    }
}