import React from 'react';
import styles from './header.module.css';
import resumeSvg from "../../assets/resume.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceGrinHearts } from '@fortawesome/free-solid-svg-icons';
function Header() {
    return(
        <div className={styles.container}>
            <div className={styles.left}>
            <p className={styles.heading}>A <span>Resume</span> that stands out!</p>
            <p className={styles.heading}>Make your own resume <FontAwesomeIcon icon={faFaceGrinHearts  }  /> <span>It's Free </span></p>
            </div>
            <div className={styles.right}>
                <img src={resumeSvg} alt="Resume" />
            </div>
        </div>
    )
}
 
export default Header;
