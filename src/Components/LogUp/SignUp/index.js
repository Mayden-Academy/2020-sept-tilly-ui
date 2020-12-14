import React from 'react';
import Button from "../../Button";


class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                username: '',
                email: '',
                password: '',
                description: '',
            isValid: {
                username: false,
                password: false,
                email: false
            }}
    }


    handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
        this.validate()

        console.log(this.state);
    }

    handleSubmit = () => {
        //push data to DB
        //Update to logged in
        //Check if isValid = true before posting data
        if(
            this.state.isValid.email &&
            this.state.isValid.password &&
            this.state.isValid.username
        ){
            //send data
        }
    }

    validate(){
        let input = this.state;

        if (typeof input["email"] !== "undefined") {
            const emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (emailPattern.test(input["email"])) {
                this.state.isValid.email = true;
            } else {
                this.state.isValid.email = false;
            }
        }

        if (typeof input["password"] !== "undefined") {
            const passwordPattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/);
            if (passwordPattern.test(input["password"])) {
                this.state.isValid.password = true;
            } else {
                this.state.isValid.password = false;

            }
        }

        //Need to add validation for username - comparing to DB usernames on file
    }

    render() {

        return (

            <div
                id="logup">

                <img
                    src="Images/tilly1.png" alt="tilly logo"/>

                <h5>
                    today i learned lots... yay!
                </h5>

                <h2
                    className="logup-title">
                    create an account
                </h2>

                <div id="logup-form">
                    <div className="logup-row">
                        <label
                            className="logup-label"
                            htmlFor="username">
                            username
                        </label>
                        <input
                            id="username"
                            className="logup-input"
                            type="text"
                            required
                            name="username"
                            value={this.state.username}
                            onChange={this.handleInput}
                        />
                        <div
                            className="validity-check">
                                {this.state.isValid.username &&
                                <div className="valid-input">&#10003;</div>
                                }
                        </div>
                    </div>
                    <div
                        className="logup-row requirements fade-text x-small">
                        required, only letters &amp;amp; numbers
                    </div>
                    <div
                        className="logup-row">
                        <label
                            className="logup-label"
                            htmlFor="email">
                            email
                        </label>
                        <input
                            id="email"
                            className="logup-input"
                            type="email"
                            required
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInput}
                        />
                        <div
                            className="validity-check">
                                {this.state.isValid.email &&
                                <div className="valid-input">&#10003;</div>
                                }
                        </div>
                    </div>
                    <div
                        className="logup-row requirements fade-text x-small">
                        required
                    </div>
                    <div
                        className="logup-row">
                        <label
                            className="logup-label"
                            htmlFor="password">password
                        </label>
                        <input
                            id="password"
                            className="logup-input"
                            type="password"
                            required
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInput}
                        />
                        <div
                            className="validity-check">
                            {this.state.isValid.password &&
                            <div className="valid-input">&#10003;</div>
                            }
                        </div>
                    </div>
                    <div
                        className="logup-row requirements fade-text x-small">
                        required, min. 6 characters
                    </div>
                    <div
                        className="logup-row">
                        <label
                            className="logup-label"
                            htmlFor="about-me">
                            about me
                        </label>
                        <textarea
                            id="about-me"
                            maxLength="500"
                            className="logup-input"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleInput}>
                        </textarea>
                        <div className="validity-check"></div>
                    </div>
                    <div
                        className="logup-row check-length requirements fade-text x-small">
                        <span
                            className="text-length">
                            {this.state.description.length}
                        </span>
                        <span>/500</span>
                    </div>
                </div>

                <Button
                    name="sign up"
                    onClick={this.handleSubmit}
                />

                <div
                    className="switch-logup">
                    <p
                        className="small">
                        already have an account?
                    </p>
                    <p>
                        <a
                            onClick={this.props.onHandleSwitch}>
                            log in
                        </a>
                    </p>
                </div>

            </div>

        );
    }
}


export default SignUp;