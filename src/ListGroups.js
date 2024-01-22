import { useState } from 'react' 
function ListGroups({isAdmin, myGroup, user, deletePerson}){
    const [showModal, setShowModal] = useState(false);
    const [deletedUser, setDeletedUser] = useState(null)
    const toggleModal = () => {
        console.log(showModal)
          setShowModal(!showModal);
      };
    return (
        <div style={{display: "flex"}}>
            <div>
              {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={toggleModal}>&times;</span>
                        <h2>Are you sure you want to remove {deletedUser.Person} from this group?</h2>
                        <button onClick={() => deletePerson(deletedUser)} style={{marginRight: "5%", width: "20%", backgroundColor: "#007600", color: "white"}} className='submit-button'>Yes</button>
                        <button onClick={toggleModal} className='submit-button' style={{width: "20%", backgroundColor: '#C4001A', color: 'white'}}>No</button>
                    </div>
                </div>
            )}
              </div>
            <div style={{
                marginTop: "7%",
                backgroundColor: '#f2f2f2',
                width: '200px',
                height: '100vh',
                position: 'fixed',
                left: '0',
                top: '0',
                overflowY: 'auto',
                padding: '20px',
                boxShadow: '2px 0 5px rgba(0,0,0,0.2)' 
            }}>
                {console.log(myGroup)}
                <p>Group Members</p>
                {myGroup.map((people) => (
                    <div key={people.Person}>
                        <p>{people.Person} {isAdmin && <span onClick={() => [toggleModal(), setDeletedUser(people)]} style={{cursor: 'pointer', color: 'red'}}>X</span>}</p>
                    </div>
                ))}
                {Object.keys(user).length > 1 && 
                    <>
                        <div>
                            <hr/>
                            {console.log()}
                            <p>{user['friend'][0]['Person']}'s List</p>
                            {user['friend'].map((lists) => (
                                <p key={lists['item']}>{lists['item']}</p>
                            ))}
                        </div>
                        <div>
                            <hr/>
                            <p>My List</p>
                            {user['myself'].map((lists) => (
                                <p key={lists['item']}>{lists['item']}</p>
                            ))}
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default ListGroups