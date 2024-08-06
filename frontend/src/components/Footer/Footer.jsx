// import React from 'react'
import { assets } from '../../assets/assets'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>choose from a diverse menu faturing a delecatable array of dishes crafted with the finest ingredient and culinary expertise. Our mission is to satisfy your craving and elevate your dining expeience.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
        </div>
        <div className="footer-content-right">
                <h2>Get In Touch</h2>
                <ul>
                    <li>+91-62612-57575</li>
                    <li>company@tomato.com</li>
                </ul>
        </div>
      </div>
      <hr />
        <p className="footer-copyright">
            Copyright  2024  @ Himanshu.com - All Right Researved.
        </p>
    </div>

  )
}

export default Footer
