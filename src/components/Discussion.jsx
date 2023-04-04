import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import LikeDiscussion from "./LikeDiscussion";
import Comment from './Comment';

export default function Discussion() {
  const { id } = useParams();
  const [Discussion, setDiscussion] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const docRef = doc(db, "Discussions", id);
    onSnapshot(docRef, (snapshot) => {
      setDiscussion({ ...snapshot.data(), id: snapshot.id });
    });
  }, []);
  return (
    <div className="container border bg-light" style={{ marginTop: 70 }}>
      {Discussion && (
        <div className="row">
          <div className="col-3">
            <img
              src={Discussion.imageUrl}
              alt={Discussion.title}
              style={{ width: "100%", padding: 10 }}
            />
          </div>
          <div className="col-9 mt-3">
            <h2>{Discussion.title}</h2>
            <h5>Author: {Discussion.createdBy}</h5>
            <div> Posted on: {Discussion.createdAt.toDate().toDateString()}</div>
            <hr />
            <h4>{Discussion.description}</h4>

            <div className="d-flex flex-row-reverse">
              {user && <LikeDiscussion id={id} likes={Discussion.likes} />}
              <div className="pe-2">
                <p>{Discussion.likes.length}</p>
              </div>
            </div>
            {/* comment  */}
            <Comment id={Discussion.id} />
          </div>
        </div>
      )}
    </div>
  );
}
