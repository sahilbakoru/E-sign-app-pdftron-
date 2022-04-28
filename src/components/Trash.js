import React, { useEffect, useState } from 'react';
import { Button, Table, Text, Spinner } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import { useSelector, useDispatch } from 'react-redux';
import { searchForDocumentsSigned,firestore } from '../firebase/firebase';
import { selectUser } from '../firebase/firebaseSlice';
import { setDocToView } from './ViewDocument/ViewDocumentSlice';
import { navigate } from '@reach/router';

const Trash = () => {
  const user = useSelector(selectUser);
  const { phone } = user;
  const [docs, setDocs] = useState([]);
  const [show, setShow] = useState(true);

  const dispatch = useDispatch();

 
  useEffect(() => {
    async function getDocs() {
      const docsToView = await searchForDocumentsSigned(phone);
      setDocs(docsToView);
      console.log("docsToView",docsToView);
      setShow(false);
    }
    setTimeout(getDocs, 1000);
  }, [phone]);

  const restore =  async( docId,doc) => {
     firestore.collection("documentsToSign").doc(docId).update({isdelete:"false"});
      const docsToView = await searchForDocumentsSigned(phone);
      setDocs(docsToView);
     };

  return (
    <div>
      {show ? (
        <Spinner show={show} accessibilityLabel="spinner" />
      ) : (
        <div>
          
          
          {docs.length > 0 ? (
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <Text weight="bold">From</Text>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Text weight="bold">When</Text>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
             
                {docs.map(doc => (
                  <Table.Row key={doc.docRef}>
                    <Table.Cell>
                      {doc.isdelete==="true"?  <div>
                      {doc.phones.map(phone => (
                        <Text key={phone}>{phone}</Text>
                      ))}
                       </div>:
                      ""}
                     
                      {/* {doc.phones.map(phone => (
                        <Text key={phone}>{phone}</Text>
                      ))} */}
                    </Table.Cell>
                    <Table.Cell>
                    {doc.isdelete==="true"? <div>
                      {doc.phones.map(phone => (
                         <Text>{doc.signedTime ? new Date(doc.signedTime.seconds*1000).toDateString() : ''}</Text>
                      ))}
                       </div>:""
                      }
                      {/* <Text>{doc.signedTime ? new Date(doc.signedTime.seconds*1000).toDateString() : ''}</Text> */}
                    </Table.Cell>
                    <Table.Cell>

                    {doc.isdelete==="true"? <span style={{padding:"2%"}}>
                      {doc.phones.map(phone => (
                         <button class="btn btn-primary" style={{paddingLeft:"8%"}}
                         onClick={event => {
                           const { docRef, docId } = doc;
                           dispatch(setDocToView({ docRef, docId }));
                           navigate(`/viewDocument`);
                         }}
                       
                       > View</button>
                      ))}
                      </span>:""
                      }
                      {/* <Button
                        onClick={event => {
                          const { docRef, docId } = doc;
                          dispatch(setDocToView({ docRef, docId }));
                          navigate(`/viewDocument`);
                        }}
                        text="View "
                        color="blue"
                        inline
                      /> */}
                      
                      {doc.isdelete==="true"? <div style={{padding:"2%"}}>
                      {doc.phones.map(phone => (
                    <button class="btn btn-warning" style={{paddingLeft:"2%"}}
                    onClick={() => {
                        restore(doc.docId,doc.isdelete);
                    }} >Restore</button>
                      ))}
                       </div>:""
                      }
                   
   
                    </Table.Cell>
                  </Table.Row>
))}
              </Table.Body>
            </Table>
          ) : (
            'You do not have any documents to review'
          )}
        </div>
      )}
    </div>
  );
};

export default Trash;
