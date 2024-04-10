import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";

const Home = ({isAuth}) => {

  const [postLists, setPostList] = useState([]);
  const [toggle,setToggle] = useState(true)
  const postsCollectionRef = collection(db, "posts");

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    setToggle(!toggle);
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  },[toggle]);

  return (
    <div className="home-container">
      <div className="home-page">
        {postLists.map((post) => {
          return (
            <div className="post" key={post.id}>
              <div className="post-image">
                <img src={post.image} alt="" />
              </div>
              <div className="post-header">
                <div className="title">
                  <h3> {post.title}</h3>
                </div>
                <div className="delete-post">
                  {isAuth && post.author.id === auth.currentUser.uid && (
                    <button
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >
                      {" "}
                      &#128465;
                    </button>
                  )}
                </div>
              </div>
              <div className="post-text"> <p>{post.postText}</p> </div>
              <p>@{post.author.name}</p>
            </div>
          );
        })}
      </div>
    </div>
    
  )
}

export default Home

