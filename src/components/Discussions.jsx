import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import DeleteDiscussion from "./DeleteDiscussion";
import { useAuthState } from "react-firebase-hooks/auth";
import LikeDiscussion from "./LikeDiscussion";
import { Link } from "react-router-dom";

export default function Discussions() {
  const [Discussions, setDiscussions] = useState([]);
  const [user] = useAuthState(auth);
  useEffect(() => {
    const DiscussionRef = collection(db, "Discussions");
    const q = query(DiscussionRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const Discussions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDiscussions(Discussions);
      console.log(Discussions);
    });
  }, []);
  return (
    <div>
      {Discussions.length === 0 ? (
        <p>No Discussions found!</p>
      ) : (
        Discussions.map(
          ({
            id,
            title,
            description,
            imageUrl,
            createdAt,
            createdBy,
            userId,
            likes,
            comments,
          }) => (
            <div className="border mt-3 p-3 bg-light" key={id}>
              <div className="row">
                <div className="col-3">
                  <Link to={`/Discussion/${id}`}>
                    <img
                      src={imageUrl}
                      alt="title"
                      style={{ height: 180, width: 180 }}
                    />
                  </Link>
                </div>
                <div className="col-9 ps-3">
                  <div className="row">
                    <div className="col-6">
                      {createdBy && (
                        <span className="badge bg-primary">{createdBy}</span>
                      )}
                    </div>
                    <div className="col-6 d-flex flex-row-reverse">
                      {user && user.uid === userId && (
                        <DeleteDiscussion id={id} imageUrl={imageUrl} />
                      )}
                    </div>
                  </div>
                  <h3>{title}</h3>
                  <p>{createdAt.toDate().toDateString()}</p>
                  <h5>{description}</h5>

                  <div className="d-flex flex-row-reverse">
                    {user && <LikeDiscussion id={id} likes={likes} />}
                    <div className="pe-2">
                      <p>{likes?.length} likes</p>
                    </div>
                    {comments && comments.length > 0 && (
                      <div className="pe-2">
                        <p>{comments?.length} comments</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
}
