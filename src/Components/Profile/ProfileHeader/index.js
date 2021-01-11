import React from "react";
import Button from "../../Button";

export default function ProfileHeader(props) {
    return (
        <div className="profileHeader">
            <div className={props.currentUser.loggedIn ? "profileTitleSpaceBetween" : "profileTitleCenter"}>
                <h3>
                    {props.username}
                </h3>
                {props.currentUser.username !== props.username && props.currentUser.loggedIn &&
                <div>
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
            <div className="profileBio fade-text">
                {props.description}
            </div>
        </div>
    );
}