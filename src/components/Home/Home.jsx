import React, { Component } from 'react';

import './Home.css';

export default class Home extends Component {
    render() {
        return (
        <div>
            <h1>Documents</h1>
            <ul className='documents'>
                <li><a href="/doc?id=2212.08011&title=0,594,70,100&authors=0,594,115,140">Sample Document 1.pdf</a></li>
                <li><a href="/doc?id=2212.07937&title=0,594,70,130&authors=0,594,130,150">Sample Document 2.pdf</a></li>
                <li><a href="/doc?id=2212.07931&title=0,594,50,110&authors=0,594,115,135">Sample Document 3.pdf</a></li>
            </ul>
        </div>
        );
    }
}
