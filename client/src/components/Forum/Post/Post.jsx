import React from 'react';

export default function Post({post}) {

  if(post === null) return null ;
    
  console.log(post);

    const UUID_UserID = post['UUID_UserID']
    const STR_Title = post['STR_Title']
    const STR_Body = post['STR_Body']
    const createdAt = post['createdAt']

  return (
    <div className="post">
        <p>Titre : {STR_Title} par {UUID_UserID}</p>
        <p>{STR_Body}</p>
        <p>Publié le {createdAt}</p>
        <p>===========</p>
    </div>
  );
}
