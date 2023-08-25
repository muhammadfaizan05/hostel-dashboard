import axios from 'axios';
import React, { useEffect, useState } from 'react';

import {Accordion,  AccordionItem,AccordionItemHeading,  AccordionItemButton, AccordionItemPanel} from 'react-accessible-accordion';
// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';


export default function Complain() {
    let [complains, setcomplains] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:1000/getcomplain')
            .then((response) => setcomplains(response.data))
            .catch((error) => console.error('Error fetching rooms:', error));

    }, []);
    console.log(complains);
    return (
        <div className='w-10/12 m-auto'>
            
      <h3 className='font-semibold text-2xl text-indigo-500 mt-2 mb-2'>Students Complains</h3>
        <Accordion>

            {complains.map((singlecomplain)=>{
                return <AccordionItem className='shadow-sm'>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                          Student Name: {singlecomplain.studentName}
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div className='text-teal-800 text-xl text-left mb-2'>
                            <span>From Room No. </span>
                        <span>{singlecomplain.roomNumber} :</span>
                        </div>
                        <p className='font-serif no-underline text-lg text-left '>
                           {singlecomplain.subject} <br/>
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at neque ultrices, aliquet mauris ut, accumsan massa. In in turpis ipsum. 
                        </p>
                    </AccordionItemPanel>
                </AccordionItem>
            })}
        </Accordion>
        </div>
    );
}