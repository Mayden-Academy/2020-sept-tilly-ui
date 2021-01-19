import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Button from "../Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartLine } from '@fortawesome/free-regular-svg-icons';
import './lesson.css';
import '../Button/buttons.css';

export default function Lesson(props) {
    const [options, openOptions] = useState(false);
    const [share, openShare] = useState(false);

    useEffect(() => {
        document.addEventListener('keyup', closeOptions, false);
        document.addEventListener('keyup', closeShare, false);
        return () => {
            document.removeEventListener('keyup', closeOptions, false);
            document.removeEventListener('keyup', closeShare, false);
        };
    });

    function closeOptions(event) {
        if (event.target.classList.contains('lesson-modal-bg') || event.key === 'Escape') openOptions(false);
    }

    function closeShare(event) {
        if (event.target.classList.contains('lesson-modal-bg') || event.key === 'Escape') openShare(false);
    }

    return (
        <div className="lesson">
            <span className="small">
                <Link to={"/" + props.lesson.username}>
                    {props.lesson.name}
                </Link>
            </span>
            <span className="fade-text small lesson-username">
                @{props.lesson.username}
            </span>
            <span className="fade-text small lesson-date">
                {props.lesson.date}
            </span>
            {props.lesson.username === props.currentUser.username &&
            <Button
                className="lesson-options delete"
                name="..."
                onHandleClick={() => openOptions(true)}
            />
            }
            {props.lesson.username === props.currentUser.username && options &&
            <div className="lesson-options">
                <div
                    className="lesson-modal-bg"
                    onClick={closeOptions}>
                </div>
                <button
                    className="lesson-options-list"
                    onClick={() => console.log('doing this will delete it')}>
                    delete
                    <FontAwesomeIcon
                        icon={faTrash}
                    />
                </button>
            </div>
            }
            <p>
                {props.lesson.lesson}
            </p>
            <span className="actionBar">
                <button
                    onClick={() => openShare(true)}>
                    <FontAwesomeIcon icon={faShareAlt} />
                </button>
                <button>
                    <FontAwesomeIcon icon={faHeartLine} />
                </button>
            </span>
            {share &&
                <>
                    <div
                        className="lesson-modal-bg modal-dark"
                        onClick={closeShare}>
                    </div>
                    <div className="lesson-share-modal">
                        <h4>Share this lesson!</h4>
                        <p className="small">Just copy the link below</p>
                        <input type="text"
                            value={"localhost:3000/" + props.currentUser.username + "/lessons/" + props.lesson.id}
                        />
                    </div>
                </>
            }
        </div>
    );
}
