import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/messages';

class Register extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        passwordConfirm:""
    }

     static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated:PropTypes.bool
    }

    onSubmit = e => {
        e.preventDefault();
        const { username, email, password, passwordConfirm } = this.state;
        if (password !== passwordConfirm) {
            this.props.createMessage({ passwordNotMatch: 'Passwords do not match' });
        } else {
            const newUser = {
                username,
                email,
                password
            };
            this.props.register(newUser);
          
        }
        
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
       }

        const {username, email, password, passwordConfirm
    } = this.state;
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                <h2 className="text-center">Register</h2>
                     <form onSubmit={this.onSubmit}>
                       <div className="form-group">
                        <label>Username</label>
                        <input className="form-control"
                            type="text"
                            name="username"
                            onChange={this.onChange}
                            value={username}
                        />
                    </div>
                     <div className="form-group">
                        <label>Email</label>
                        <input className="form-control"
                            type="email"
                            name="email"
                            onChange={this.onChange}
                            value={email}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control"
                            type="password"
                            name="password"
                            onChange={this.onChange}
                        />
                        </div>
                         <div className="form-group">
                        <label>Confirm Password</label>
                        <input className="form-control"
                            type="password"
                            name="passwordConfirm"
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <button 
                            className="btn btn-primary">
                           Register
                        </button>
                        </div>
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                </form>
                </div>
            </div>
        
        )
    }
}
 
const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated
});

export default connect(mapStateToProps,{register, createMessage})(Register);