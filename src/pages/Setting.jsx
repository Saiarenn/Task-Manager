import React from 'react';
import {observer} from "mobx-react-lite";
import bg from '../assets/taskimg1.png'

const Setting = observer(() => {
    return (
        <div>
            <img
                style={{ width: "100%", height: "100px" }}
                src={bg}
                alt={''}
            />
        </div>
    )
});

export default Setting;