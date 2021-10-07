import React, {useState} from 'react';

import '../styles/dialogStyles.scss';

function AlertDialog() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = (event) => {
        event.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {open && <div className="overlay">
                <div className="dialog container">
                    <div className="dialog-content">
                        <h2>Delete contact?</h2>
                        <div className="dialog-text">
                            Are you sure you want to delete this contact? Deleted contacts cannot be recovered.
                        </div>
                    </div>
                    <button className="red" onClick={handleClose}>Yes</button>
                    <button onClick={handleClose}>No</button>
                </div>
            </div>}
            <button className="red" variant="outlined" onClick={handleClickOpen}>Delete contact</button>
        </div>
    );
}

// AlertDialog.propTypes = {
//     selectedContact: PropTypes.object,
//     handleSubmitEdit: PropTypes.func.isRequired
// }

export default AlertDialog;

// //()=>handleDelete(contactId)