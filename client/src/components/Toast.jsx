import React from 'react'
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { useRef } from 'react';

const Toast = () => {
    const toastInstance = useRef(null);
    const toastCreated = () => {
        toastInstance.current.show();
    }

    return (
        <div>
             <ToastComponent ref={toastInstance} id='toast_type' title="Success!" content="Your message has been sent successfully." created={toastCreated}
                position={{X: 'Right', Y: 'Top' }} cssClass={'e-toast-success'} icon={'e-success toast-icons'} />
        </div>
    )
}

export default Toast