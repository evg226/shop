import "./user.css";
import React, {useEffect, useState} from 'react'
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getActiveUser, getOrders} from "../store/selectors";
import {useNavigate, useParams} from "react-router";
import {USER_ROUTE,PRODUCT_ROUTE} from "../constants";
import {userSigninQuery, userSignOutQuery} from "../store/action";
import {Orders} from "../components/orders";

export const  User = () => {
    const {action}=useParams();
    const activeUser=useSelector(getActiveUser,shallowEqual);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [name,setName]=useState("");
    const [surname,setSurname]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [gender,setGender]=useState("");

    const orders=useSelector(getOrders,shallowEqual);

    useEffect(()=>{
        if (activeUser.login){
            setEmail(activeUser.login);
            setName(activeUser.name);
            setSurname(activeUser.surname);
        } else if (!action){
            navigate(USER_ROUTE+"/signin");
        }
    },[activeUser.login,action]);

    const hadnleJoinNow=()=>{

        if (action==="signin") {
            dispatch(userSigninQuery(email, password))
            setPassword("");
        };
    }

    return (
            <main>
                <section className="signup">
                    <form action='' method="post">
                        <div className="signup__container container">
                            <div className="signup__left">
                                {(activeUser.login|| action==="signup") &&
                                    <>
                                        <div className='signup__header'>Your name</div>
                                        <input className='signup__input' type='text' placeholder='First Name' disabled={ action!=="signup"}
                                               value={name} onChange={(e) => setName(e.target.value)}/>
                                        <input className='signup__input' type='text' placeholder='Last Name' disabled={ action!=="signup"}
                                               value={surname} onChange={(e) => setSurname(e.target.value)}/>
                                        <div>
                                            <div className='signup__radio-gr'>
                                                <label className='signup__label' htmlFor='male'>
                                                    <input className='signup__input signup__input_radio' type='radio'
                                                           name='gender' id='male'
                                                           value="male"
                                                           onClick={() => setGender("male")}
                                                    />
                                                    Male
                                                </label>
                                                <label className='signup__label' htmlFor='female'>
                                                    <input className='signup__input signup__input_radio' type='radio'
                                                           onClick={() => setGender("female")} name='gender'
                                                           id='female'/>
                                                    Female
                                                </label>
                                            </div>
                                        </div>
                                    </>
                                }

                                <h2 className='signup__header signup__desc'>Login details</h2>
                                <input className='signup__input' type='email' value={email}
                                       onChange={(e)=>setEmail(e.target.value)} placeholder='E-mail' />
                                {(!activeUser.login || action==="signup") &&
                                <input className='signup__input' type='password' value={password} autoComplete={password}
                                       onChange={(e)=>setPassword(e.target.value)} placeholder='Password' />}
                                <div className='signup__text'>
                                    Please use 8 or more characters, with at least 1 number and a mixture of uppercase and lowercase letters
                                </div>
                                {(!activeUser.login||action==='signup')&&
                                    <a onClick={hadnleJoinNow} className='signup__button signup_join'>Join now</a>
                                }

                                {activeUser.login && action!=='signup' &&
                                    <span className={"buttons"}>
                                    <a onClick={()=>navigate(PRODUCT_ROUTE)} className='signup__button signup__button-out '>Start
                                        shopping</a>
                                    <a name='signout' onClick={()=>dispatch(userSignOutQuery())}
                                            className='signup__button signup__button-out '>Sign out</a>
                                        </span>
                                }
                                {activeUser.login && action&&action!=="signin" && <a onClick={() => navigate(USER_ROUTE)}>
                                    User page&gt;&gt;</a>
                                }

                                {action==="signup" && (!activeUser.login) &&
                                    <a onClick={()=>navigate(USER_ROUTE + "/signin")}>
                                        Signin now &gt;&gt;</a>
                                }
                                {action !== "signup" &&
                                    <a className={"signup1"} onClick={()=>navigate(USER_ROUTE + "/signup")}>Signup now &gt;&gt;</a>
                                }
                            </div>
                            <div className="signup__right">
                                {
                                    !Object.keys(orders).length?
                                        <SignupRightText />
                                        :
                                        <Orders orders={orders}/>
                                }

                            </div>
                        </div>
                    </form>
                </section>
            </main>
    );
}



const SignupRightText=()=>{
    return (
        <>
            <h2 className="signup__desc signup__desc_header">LOYALTY HAS ITS PERKS</h2>
            <div className="signup__desc">Get in on the loyalty program where you can earn points
                and unlock serious perks. Starting with these as soon as you join:
            </div>
            <ul className="signup__desc">
                <li className="signup__desc">15% off welcome offer
                </li>
                <li className="signup__desc">Free shipping, returns and exchanges on all orders

                </li>
                <li className="signup__desc">$10 off a purchase on your birthday

                </li>
                <li className="signup__desc">Early access to products</li>
                <li className="signup__desc">Exclusive offers & rewards</li>
            </ul>
        </>
    )
}

