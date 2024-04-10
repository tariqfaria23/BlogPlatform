import React, { useState, useEffect, useRef, useMemo } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { FaFileImage } from "react-icons/fa";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

const CreatePost = ({isAuth}) => {

  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [img, setImg] = useState(null);

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    try {
      const imgId=uuidv4();
      const storageRef = ref(storage, imgId);
      console.log('1');
      const uploadTask = uploadBytesResumable(storageRef, img);
      // Register three observer
      uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        console.log(error)
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('5')
          await addDoc(postsCollectionRef, {
            title,
            postText,
            author : { name: auth.currentUser.displayName, id: auth.currentUser.uid },
            image : downloadURL,
          });
          setImg(null)
          console.log('10')
          navigate('/');
        });
      }
    );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);
  
  return (
    <div className="cp-page">
      <div className="cp-container">
        <p>Create A Post</p>
        <div className="cp-input">
          <label> Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="cp-input">
          <label> Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />

        </div>
        <div className="file-input">
          <input type="file" id="img-input" onChange={(e) => setImg(e.target.files[0])} style={{display:'none'}} />
          <label htmlFor="img-input" >
          <span className="img-inp"><FaFileImage />Add image</span>
          </label>
        </div>
        
        <button className="submit-post-btn" onClick={createPost} > Submit Post</button>
      </div>
    </div>
  )
}

export default CreatePost
 // 26