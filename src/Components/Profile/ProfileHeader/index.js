import React from "react";
import {Link} from "react-router-dom";
import Button from "../../Button";

export default function ProfileHeader(props) {
    return (
        <div className="profileHeader">
            <div className="profileDetails">
                <div className="profileNames">
                    <h3>
                        <Link to={"/" + props.username}>
                        {props.name}
                        </Link>
                    </h3>
                    <p className="fade-text">
                        @{props.username}
                    </p>
                    <p className="small">
                        {props.lessons.length} lessons
                    </p>
                </div>
                {props.currentUser.username !== props.username && props.currentUser.loggedIn &&
                <div className="profileButton">
                    {props.currentUserFollowing.find(o => o.username === props.username) ?
                        <Button
                            onHandleClick={props.onUnfollow}
                            value={props.id}
                            className="generic unfollow"
                            name="unfollow"
                        />
                        :
                        <Button
                            onHandleClick={props.onFollow}
                            value={props.id}
                            className="generic"
                            name="follow"
                        />
                    }
                </div>
                }
            </div>
            <div className="profileBio">
                {props.description}
            </div>
        </div>
    );
}