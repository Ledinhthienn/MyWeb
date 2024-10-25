import axios from "axios";
import React, { Component } from "react";
import { FaEnvelope, FaUser, FaKey, FaLock } from 'react-icons/fa';

class Resetpwd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtEmail: '',
            txtID: '',
            txtToken: '',
            txtPassword: '',
            isSendEmailButtonHovered: false,
            isResetButtonHovered: false,
        };
    }

    render() {
        return (
            <div style={styles.alignCenter}>
                {/* Background video */}
                <video autoPlay muted loop style={styles.backgroundVideo}>
                    <source src="video4.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div style={styles.formContainer}>
                    <h2 style={styles.title}>RESET PASSWORD</h2>
                    <form>
                        <div style={styles.inputGroup}>
                            <FaEnvelope style={styles.icon} />
                            <input
                                type="text"
                                placeholder="Email"
                                value={this.state.txtEmail}
                                onChange={(e) => this.setState({ txtEmail: e.target.value })}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.inputGroupRight}>
                            <input
                                type="submit"
                                value="SEND EMAIL"
                                onClick={(e) => this.btnEmailClick(e)}
                                style={{
                                    ...styles.sendEmailButton,
                                    ...(this.state.isSendEmailButtonHovered ? styles.sendEmailButtonHover : {}),
                                }}
                                onMouseEnter={() => this.setState({ isSendEmailButtonHovered: true })}
                                onMouseLeave={() => this.setState({ isSendEmailButtonHovered: false })}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <FaUser style={styles.icon} />
                            <input
                                type="text"
                                placeholder="ID"
                                value={this.state.txtID}
                                onChange={(e) => this.setState({ txtID: e.target.value })}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <FaKey style={styles.icon} />
                            <input
                                type="text"
                                placeholder="Token"
                                value={this.state.txtToken}
                                onChange={(e) => this.setState({ txtToken: e.target.value })}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <FaLock style={styles.icon} />
                            <input
                                type="password"
                                placeholder="New password"
                                value={this.state.txtPassword}
                                onChange={(e) => this.setState({ txtPassword: e.target.value })}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <input
                                type="submit"
                                value="RESET"
                                onClick={(e) => this.btnResetClick(e)}
                                style={{
                                    ...styles.resetButton,
                                    ...(this.state.isResetButtonHovered ? styles.resetButtonHover : {}),
                                }}
                                onMouseEnter={() => this.setState({ isResetButtonHovered: true })}
                                onMouseLeave={() => this.setState({ isResetButtonHovered: false })}
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    // Event handlers
    btnEmailClick(e) {
        e.preventDefault();
        const email = this.state.txtEmail;
        if (email) {
            this.apiSendmail(email);
        } else {
            alert("Please input email");
        }
    }

    btnResetClick(e) {
        e.preventDefault();
        const { txtID, txtToken, txtPassword } = this.state;
        if (txtID && txtToken && txtPassword) {
            this.apiResetpwd(txtID, txtToken, txtPassword);
        } else {
            alert('Please input ID, token, and password');
        }
    }

    // APIs
    apiSendmail(email) {
        axios.get('/api/customer/sendmail/' + email)
            .then((res) => {
                const result = res.data;
                alert(result.message);
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });
    }

    apiResetpwd(id, token, password) {
        const body = { id: id, token: token, password: password };
        axios.post('/api/customer/resetpwd', body)
            .then((res) => {
                const result = res.data;
                if (result) {
                    alert('Password reset successful!');
                } else {
                    alert('Password reset failed!');
                }
            })
            .catch((error) => {
                console.error('Error resetting password:', error);
            });
    }
}

const styles = {
    alignCenter: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
        marginTop: '10px',
        borderRadius: '10px',
        overflow: 'hidden',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1, // To send it behind the form
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '20px',
        padding: '0px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        color: '#333',
        width: '500px',
        boxSizing: 'border-box',
        backdropFilter: 'blur(0px)',
        zIndex: 1, // Bring form on top of video
    },
    title: {
        marginBottom: '20px',
        fontSize: '30px',
        fontWeight: 'bold',
        color: '#990033',
    },
    inputGroup: {
        position: 'relative',
        marginBottom: '15px',
    },
    inputGroupRight: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '15px',
    },
    input: {
        width: 'calc(100% - 40px)',
        padding: '12px',
        paddingLeft: '40px',
        border: '1px solid #ccc',
        borderRadius: '20px',
        boxSizing: 'border-box',
        fontSize: '16px',
        outline: 'none',
    },
    icon: {
        position: 'absolute',
        left: '35px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#ccc',
    },
    sendEmailButton: {
        background: '#FF0066',
        color: 'white',
        padding: '10px 80px',
        border: 'none',
        borderRadius: '20px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '5px',
        transition: 'background 0.3s ease, color 0.3s ease',
        fontWeight: 'bold',
        outline: 'none',
    },
    sendEmailButtonHover: {
        background: '#CC0055',
        color: '#F0F0F0',
    },
    resetButton: {
        background: '#00CC33',
        color: 'white',
        padding: '10px 90px',
        border: 'none',
        borderRadius: '20px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '5px',
        transition: 'background 0.3s ease, color 0.3s ease',
        fontWeight: 'bold',
        outline: 'none',
    },
    resetButtonHover: {
        background: '#009922',
        color: '#F0F0F0',
    },
};

export default Resetpwd;
