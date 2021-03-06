import './App.css';
import {useEffect, useState} from "react";

function App() {
    const REWARD_APP_ID = 2;
    const GL_BASE_URL = 'https://getlogin.org/';
    // const GL_BASE_URL = 'https://getlogin.localhost:3000/';
    const API_URL = 'https://localhost:8080/';
    const [GLStatus, setGLStatus] = useState('loading');
    const [GLInstance, setGLInstance] = useState(null);

    const setAccessToken = token => {
        localStorage.setItem('access_token', token);
    };

    const getAccessToken = () => {
        return localStorage.getItem('access_token');
    };

    const onLogout = () => {
        console.log('Logged out');
        setAccessToken('');
        setGLStatus('not_logged');
    };

    const submitRewardRequest = (address, usernameHash) => {
        console.log('reward', address, usernameHash)
        fetch(`${API_URL}reward`, {
            method: 'POST',
            body: JSON.stringify({address, usernameHash})
        }).then();
    };

    useEffect(() => {
        function checkAccessToken() {
            const urlAccessToken = (new URLSearchParams(window.location.hash.replace('#', ''))).get('access_token');
            if (urlAccessToken) {
                window.location.replace('');
                setAccessToken(urlAccessToken);
            }
        }

        async function getBalances(instance) {
            // getting latest session balances (xdai + xbzz)
            setInterval(async () => {
                console.log('balances', await instance.getSessionBalances());
            }, 5000);
        }

        async function getSessionPrivateKey(instance) {
            // getting session private key. App could use it for own purposes
            // for example - send it to FairOS node to withdraw xBzz for stamps
            console.log('session private key', await instance.getSessionPrivateKey());
        }

        function injectGetLogin() {
            const script = document.createElement('script');
            script.src = `${GL_BASE_URL}api/last.js?${Math.random()}`;
            script.async = true;
            script.type = 'module';
            script.onload = async () => {
                const instance = new window._getLoginApi();
                instance.onLogout = onLogout;
                setGLInstance(instance);
                setGLStatus('auth_checking');
                const result = await instance.init(REWARD_APP_ID, GL_BASE_URL, window.location.origin, getAccessToken());
                console.log('result', result);
                if (result.data.is_client_allowed) {
                    setGLStatus('logged');
                    getBalances(instance).then();
                    getSessionPrivateKey(instance).then();
                } else {
                    setGLStatus('not_logged');
                }
            };

            document.body.appendChild(script);
        }

        checkAccessToken();
        injectGetLogin();
    }, []);

    return (
        <div className="App">
            {GLStatus === 'not_logged' && <button onClick={() => {
                window.location.href = GLInstance.getAuthorizeUrl();
            }}>
                Login
            </button>}
            {GLStatus === 'loading' && <p>Loading GetLogin...</p>}
            {GLStatus === 'auth_checking' && <p>Auth checking...</p>}
            {GLStatus === 'logged' && <div>
                <p>Logged in!</p>
                <button onClick={() => GLInstance.logout()}>
                    Logout
                </button>

                <button onClick={() => {
                    if (GLInstance.usernameHash) {
                        submitRewardRequest(GLInstance.address, GLInstance.usernameHash);
                        setGLStatus('rewarded');
                    } else {
                        alert('Empty usernameHash');
                    }
                }
                }>
                    Get Reward
                </button>
            </div>}

            {GLStatus === 'rewarded' &&
            <p>Rewarded! Please, wait few minutes while reward will appear into your account</p>}

        </div>
    );
}

export default App;
