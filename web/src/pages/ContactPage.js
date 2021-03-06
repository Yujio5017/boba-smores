import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import ContactPhoto from '../components/ContactPhoto';
import AlertDialog from '../components/AlertDialog';
import '../styles/contactStyles.scss';
import axios from 'axios';
import {SwatchesPicker} from 'react-color'

const backgroundStyle = {
    position: 'fixed',
    backgroundColor: '#0D0D0D',
    width: '100vw',
    height:'100vh',
    top: 0,
    left: 0,
    zIndex: 2 // make this on top of everything
}
const popStyle = {
    position: 'fixed',
    backgroundColor: '#0D0D0D',
    width: '100vw',
    height:'100vh',
    textAlign:'center',

    top: 0,
    left: 0,
    zIndex: 3 // make this on top of everything
}
const ContactPage = ({selectedContact, handleEdit, handleClose, handleChange, handleDelete, userId}) => {
    
    const [tagMode,tagIsVisible] = useState(false);
    const [tagData, setTag] = useState({text:'Genius',colour:'#234242'});
    const [tag,setTags] = useState();


    const handleTag = (event) => {
        console.log(event);
        setTag({...tagData, [event.target.id]: event.target.value});
    }

    useEffect(()=>{
        getTagsFromContact()
        // eslint-disable-next-line
    },[])



    const getTagsFromContact = async () => {
        await axios.get(`https://bobasmorescrm.herokuapp.com/api/get_tags_from_contact/${(selectedContact._id)}`)
            .then(res => {
                // And send the user to the home page
                setTags(res.data)
            }
            )
    }
    const handleCreateTag = async (event) => {
        await axios.post(`https://bobasmorescrm.herokuapp.com/api/create_tag/${(JSON.parse(localStorage.getItem('cToken')))}/${selectedContact._id}`, tagData)
            .then(res => {

                // And send the user to the home page
                console.log("fuckuuuu")

                getTagsFromContact();

            })
            //tag data ->  body: text, colour, isComInterest
    }

    function handleDeleteTag (tagId,conId){
        handleRemoveTag(tagId,conId)
    }

    const handleRemoveTag = async (tagId,conId) => {
        await axios.post(`https://bobasmorescrm.herokuapp.com/api/remove_tag/${conId}/${tagId}`)
            .then(res => {
                getTagsFromContact()
                // And send the user to the home page
                // getContacts();
            })
    }



    if (Object.keys(selectedContact).length===0) {
        // set empty form fields
    }

   
    function handleTagSend(){
        handleCreateTag()
        tagIsVisible(!tagMode)
    }


    const handleChangeComplete = (color) => {
        console.log(color);
        setTag({...tagData,  colour: color.hex });

    };
    return (
        <>
        <div style={backgroundStyle}>




            <form className="contact-form" key={selectedContact._id} action="/">

            {tagMode&&
                <div style={popStyle}>
                    <div className="contact-nav" style={{paddingBottom:'8em'}}>
                        <button onClick={()=>tagIsVisible(!tagMode)}>Back</button>
                        <p></p>
                    </div>
                    <h1>Add New Tag</h1>
                    
                    <div style={{display:'flex',justifyContent:'center',margin:'80px 30%'}}>
                        <div className="tagRound" style={{background:`${tagData.colour}`,padding:'10px 50px'}}>{ brightness(`${tagData.colour}`)
                        ?   <p style={{fontSize:'2em', color: "black"}}>{tagData.text} </p>
                        :   <p style={{fontSize:'2em', color: "white"}}>{tagData.text} </p>
                        }</div>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',margin:'0px 30%',height:'70vh'}}>
                        <div style={{zIndex:'4',width:'50%'}}>
                            <SwatchesPicker onChangeComplete={ handleChangeComplete } />
                        </div>
                        <div style={{width:'50%',left:'0'}}>
                            <input type="text" name="text" id="text" style={{border:'solid'}} onChange={handleTag} defaultValue="" placeholder="Tag Name"/>
                            <br/><button onClick={()=>handleTagSend()}>Add</button>
                        </div>
                    </div>
                </div>}

                <nav>
                    <div className="contact-nav">
                        <button  onClick={handleClose}>Back</button>
                        <button className="submit" onClick={handleEdit}>Save changes</button>
                    </div>
                </nav>

                {Object.keys(selectedContact).length===0 ? 

                // This is for ADDING CONTACTS
                (<div className="page-content"> 
                    <div className="contact-header">
                        <div style={{marginRight: '40px'}}>
                            <ContactPhoto/>
                        </div>
                        
                        <div>
                            <label htmlFor ="firstname">First Name</label>
                            <input  className="contact-input" type="text" name="firstname" id="firstname" placeholder="First Name" defaultValue="" required onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor ="lastname">Last Name</label>
                            <input className="contact-input" type="text" name="lastname" id="lastname" placeholder="Last Name" defaultValue="" required onChange={handleChange}/>
                        </div>
                    </div>
                
                    <div className="contact-info-container">
                        <table className="personal-info">
                            <tbody>
                            <tr>
                                <th colspan="2"><h3>Personal information</h3></th>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="company">Company</label></td>
                                <td><input className="contact-input" colspan="0" type="text" name="company" id="company" placeholder="Company" defaultValue="" onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="city">City</label></td>
                                <td><input className="contact-input" type="text" name="city"  id="city"placeholder="City" defaultValue="" onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="country">Country</label></td>
                                <td><input className="contact-input" type="text" name="country"  id="country" placeholder="Country" defaultValue="" onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="phone">Phone</label></td>
                                <td><input className="contact-input" type="text" name="phone" id="phone" placeholder="Phone number" defaultValue="" onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="email">Email</label></td>
                                <td><input className="contact-input" type="email" name="email" id="email" placeholder="Email address" defaultValue="" onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="facebook">Facebook URL</label></td>
                                <td><input className="contact-input" type="url" name="facebook" id="facebook" placeholder="www.facebook.com/" defaultValue="" onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="linkedin">LinkedIn URL</label></td>
                                <td><input className="contact-input" type="url" name="linkedin" id="linkedin" placeholder="www.linkedin.com/" defaultValue="" onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="instagram">Instagram URL</label></td>
                                <td><input className="contact-input" type="url" name="instagram" id="instagram" placeholder="www.instagram.com/" defaultValue="" onChange={handleChange}/></td>
                            </tr>
                            </tbody>
                        </table>
                        <table className="social-info">
                        <tbody>
                            <tr>
                                <th colspan="2"><h3>Social activities</h3></th>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="date">Last catchup date</label></td>
                                <td><input className="contact-input" type="date" name="date" id="date" placeholder="dd/mm/yyyy" defaultValue="" required onChange={handleChange}/></td>
                            </tr>
                            <tr>
                            <td className="contact-label"><label htmlFor ="date">Tags</label></td>
                            <td style={{color:"#909090"}}>You need to confirm contact before adding tags</td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label for="notes">Notes</label></td>
                                <td><input className="multiline-input contact-input" type="text" name="notes" id="notes" placeholder="Enter notes here..." defaultValue="" onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td><input className="contact-input" type="hidden" name="dateTime" id="dateTime" value={new Date().toJSON().slice(0,16)}/></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>)
                :

                // This is for EDITING CONTACTS
                <div className="page-content"> 
                    <div className="contact-header">
                        <div style={{marginRight: '40px'}}>
                            <ContactPhoto/>
                        </div>
                        
                        <div>
                            <label htmlFor ="firstname">First Name</label>
                            <input className="contact-input" type="text" name="firstname" id="firstname" placeholder="First Name" defaultValue={selectedContact.contactInformation.name.firstName} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor ="lastname">Last Name</label>
                            <input className="contact-input" type="text" name="lastname" id="lastname" placeholder="Last Name" defaultValue={selectedContact.contactInformation.name.lastName} onChange={handleChange}/>
                        </div>
                    </div>
                
                    <div className="contact-info-container">
                        <table className="personal-info">
                        <tbody>
                            <tr>
                                <th colSpan="2"><h3>Personal information{selectedContact.history&&
                    <p style={{color:'grey',fontSize:'12px'}}> Created {selectedContact.history.created}</p>}</h3></th>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="company">Company</label></td>
                                <td><input className="contact-input" colSpan="0" type="text" name="company" id="company" placeholder="Company" defaultValue={selectedContact.contactInformation.company.name} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="city">City</label></td>
                                <td><input className="contact-input" type="text" name="city"  id="city"placeholder="City" defaultValue={selectedContact.contactInformation.location.city} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="country">Country</label></td>
                                <td><input className="contact-input" type="text" name="country"  id="country" placeholder="Country" defaultValue={selectedContact.contactInformation.location.country} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="phone">Phone</label></td>
                                <td><input className="contact-input" type="text" name="phone" id="phone" placeholder="Phone number" defaultValue={selectedContact.contactInformation.phone.number} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="email">Email</label></td>
                                <td><input className="contact-input" type="email" name="email" id="email" placeholder="Email address" defaultValue={selectedContact.contactInformation.email.address} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="facebook">Facebook URL</label></td>
                                <td><input className="contact-input" type="url" name="facebook" id="facebook" placeholder="www.facebook.com/" defaultValue={selectedContact.contactInformation.socials.facebook} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="linkedin">LinkedIn URL</label></td>
                                <td><input className="contact-input" type="url" name="linkedin" id="linkedin" placeholder="www.linkedin.com/" defaultValue={selectedContact.contactInformation.socials.linkedin} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="instagram">Instagram URL</label></td>
                                <td><input className="contact-input" type="url" name="instagram" id="instagram" placeholder="www.instagram.com/" defaultValue={selectedContact.contactInformation.socials.instagram} onChange={handleChange}/></td>
                            </tr>
                            </tbody>
                        </table>
                        <table className="social-info">
                        <tbody>
                            <tr>
                                <th colSpan="2"><h3>Social activities</h3></th>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="date">Last catchup date</label></td>
                                <td><input className="contact-input" type="date" name="date" id="date" placeholder="dd/mm/yyyy" required defaultValue={selectedContact.contactInformation.lastCatchup.date} onChange={handleChange}/></td>
                            </tr>

                            <tr>
                                <td className="contact-label"><label htmlFor ="">Tags</label></td>
                                <td style={{display:'flex'}}>{tag&&tag.map(tagx => (
                                <div className="tagRound" style={{background:`${tagx.colour}`}}>{ brightness(`${tagx.colour}`)
                                    ? <p style = {{color: "black"}}>{tagx.text}&nbsp;&nbsp; <button style={{padding:0,margin:0,color:'black'}} type="button" onClick={()=>handleDeleteTag(tagx._id,selectedContact._id)} > x</button></p>
                                    : <p style = {{color: "white"}}>{tagx.text}&nbsp;&nbsp; <button style={{padding:0,margin:0,color:'black'}} type="button" onClick={()=>handleDeleteTag(tagx._id,selectedContact._id)} > x</button></p>
                                    }</div>
                                ))}
                                <div><button type="button" onClick={()=>tagIsVisible(true)} style={{borderWidth:'0.2px',borderRadius:'30px',border:'solid',padding:'0px 10px'}}>+</button></div>
                                </td>
                            </tr>
                            <tr>
                                <td className="contact-label" style={{verticalAlign:"top",paddingTop:'20px'}}><label htmlFor="notes">Notes</label></td>
                                <td><textarea className="multiline-input contact-input" style={{color:'white',marginTop:'20px',borderRadius:'5px',padding:'20px',paddingBottom:'-20px'}} type="text" rows="13" name="notes" id="notes" placeholder="Enter notes here..." defaultValue={selectedContact.contactInformation.notes.notes} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td><input className="contact-input" type="hidden" name="dateTime" id="dateTime" value={new Date().toJSON().slice(0,16)}/></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                }
                <div style={{textAlign: 'center',paddingTop:'70px'}}>
                    <AlertDialog contactId={selectedContact._id} handleDelete={handleDelete} userId={userId}/>
                </div>
                {selectedContact.history&&<div style={{paddingRight:'10vw',paddingTop:'1vh'}}>
                    <p style={{color:'grey',textAlign:'right'}}>Last modified {selectedContact.history.lastModified}</p>
                </div>}
                
            </form>
        </div>
    </>
)}
  
// ContactPage.defaultProps = {
//     selectedContact: {}
// }
function brightness(colour)
{
    console.log(colour)
    var avgValue = Math.sqrt((parseInt(Number ('0x' + colour.substring(1, 3)), 10) * parseInt(Number ('0x' + colour.substring(1, 3)), 10) * 0.241) +
    (parseInt(Number ('0x' + colour.substring(3, 5)), 10) * parseInt(Number ('0x' + colour.substring(3, 5)), 10) * 0.691) +
    (parseInt(Number ('0x' + colour.substring(5, 7)), 10) * parseInt(Number ('0x' + colour.substring(5, 7)), 10) * 0.068))
    console.log(avgValue > 132)
    console.log(avgValue)
    return avgValue > 172
}    

ContactPage.propTypes = {
    selectedContact: PropTypes.object,
    handleEdit: PropTypes.func.isRequired
}

export default ContactPage;