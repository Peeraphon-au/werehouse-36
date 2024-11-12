import { useState, useEffect, useRef } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';

import { fetchPersonal } from '../../../data/personal';

import './ManagePersonnel.css';

const initpersonalsPerPage = 10



function Personal() {
    // personalsRaw -> filters -> personals -> display
    // personalsRaw
    const [personalsRaw, setPersonalsRaw] = useState([]);

    // filters

    const [personalsPerPage, setpersonalsPerPage] = useState(0);

    // personals
    
    const [personals, setPersonals] = useState([]);

    // display
    const [numPages, setNumPages] = useState(0)
    const [curPage, setCurPage] = useState(0)

    const personalsPerPageRef = useRef()



    useEffect(() => {
        if (numPages <= 0) setCurPage(0)
        else if (curPage === 0) setCurPage(1)
        else if (curPage > numPages) setCurPage(numPages)
    }, [numPages])


    useEffect(() => {
        setPersonalsRaw(fetchPersonal());

        setpersonalsPerPage(initpersonalsPerPage)
        personalsPerPageRef.current.value = initpersonalsPerPage
    }, [])


    useEffect(() => {
        console.log(`personalsPerPage: ${personalsPerPage}`)
        setNumPages(Math.ceil(personalsRaw.length / personalsPerPage))
    }, [personalsPerPage, personalsRaw])

    useEffect(() => {
        setPersonalsRaw(fetchPersonal());
        setCurPage(1)
    }, []) // load

    useEffect(() => {
        setPersonals(personalsRaw)
    }, [personalsRaw, personalsPerPage])

    // event handlers
    function deleteClcik(id) {
        setPersonalsRaw(personalsRaw.filter((personal) => personal.id !== id))
    }

    function addClick(id, name, rank, tel) {
        const newPersonal = {
            id,
            name,
            rank,
            tel,
            userId: 1,
        }
        setPersonalsRaw([...personalsRaw, newPersonal]) // work
    }

    function editClick(id, name, rank, tel) {
        const editedPersonal = {
          id,
          name,
          rank,
          tel,
          userId: 1,
        };
    
        console.log("Editing person with ID:", id);
        console.log("Updated details:", editedPersonal);
    
        // Update the specific item in personalsRaw based on the id
        setPersonalsRaw((prevPersonals) => 
          prevPersonals.map((personal) =>
            personal.id === id ? editedPersonal : personal
          )
        );
        
        // Verify the updated personalsRaw
        console.log("Updated personalsRaw:", personalsRaw);
    }


    // modal handlers
    const [showadd, setShowadd] = useState(false);
    const [showedit, setShowedit] = useState(false);

    const idRef = useRef()
    const newIdRef = useRef()
    const newNameRef = useRef()
    const newRankRef = useRef()
    const newTelRef = useRef()

    const handleCloseadd = () => setShowadd(false);
    const handleShowadd = () => setShowadd(true);

    const handleCloseedit = () => setShowedit(false);
    const handleShowedit = (personalId) => {
        setShowedit(true);
        // Safely set the value only if the ref is not null
        if (idRef.current) {
            idRef.current.value = personalId;
        }
    }


    return (
        <div className='personal-container'>
            {/* modal-add */}
            <Modal show={showadd} onHide={handleCloseadd}>

                <Modal.Header closeButton>
                    <Modal.Title><span className='bi bi-plus-lg'>&nbsp;เพิ่มข้อมูลบุคลากร</span></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>จำนวน:</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                disabled value={
                                    Number(personalsRaw.reduce((prev, personal) => personal.id > prev ? personal.id : prev
                                        , 0)) + 1
                                }
                                ref={newIdRef}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>ชื่อ:</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                ref={newNameRef}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlSelect3">
                            <Form.Label>ตำแหน่ง:</Form.Label>
                            <Form.Select aria-label="Default select example" ref={newRankRef}>
                                <option>โปรดเลือกตำแหน่ง</option>
                                <option value="ผู้จัดการคลังสินค้า">ผู้จัดการคลังสินค้า</option>
                                <option value="พนักงานคลังสินค้า">พนักงานคลังสินค้า</option>
                                <option value="ลูกจ้างคลังสินค้า">พนักงานขนส่ง</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                            <Form.Label>เบอร์ติดต่อ:</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                ref={newTelRef}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseadd}>
                        <span className='bi bi-x-lg'>&nbsp;ยกเลิก</span>
                    </Button>
                    <Button variant="primary" onClick={() => {
                        const id = newIdRef.current.value
                        const name = newNameRef.current.value.trim()
                        const rank = newRankRef.current.value.trim()
                        const tel = newTelRef.current.value.trim()
                        if (name === '') {
                            alert('name cannot be empty')
                            newNameRef.current.value = ''
                            newNameRef.current.focus()
                        } else {
                            addClick(id, name, rank, tel)
                            handleCloseadd()
                        }
                    }}>
                        <span className='bi bi-plus-lg'>&nbsp;เพิ่ม</span>
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* modal-edit */}
            <Modal show={showedit} onHide={handleCloseedit}>

                <Modal.Header closeButton>
                    <Modal.Title><span className='bi bi-plus-lg'>&nbsp;แก้ไขข้อมูลบุคลากร</span></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>จำนวน:</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                disabled value={idRef.current ? idRef.current.value : ''}
                                ref={idRef}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>ชื่อ:</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                ref={newNameRef}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlSelect3">
                            <Form.Label>ตำแหน่ง:</Form.Label>
                            <Form.Select aria-label="Default select example" ref={newRankRef}>
                                <option>โปรดเลือกตำแหน่ง</option>
                                <option value="ผู้จัดการคลังสินค้า">ผู้จัดการคลังสินค้า</option>
                                <option value="พนักงานคลังสินค้า">พนักงานคลังสินค้า</option>
                                <option value="ลูกจ้างคลังสินค้า">พนักงานขนส่ง</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                            <Form.Label>เบอร์ติดต่อ:</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                ref={newTelRef}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseedit}>
                        <span className='bi bi-x-lg'>&nbsp;ยกเลิก</span>
                    </Button>
                    <Button variant="primary" onClick={() => {
                        const id = idRef.current.value
                        const name = newNameRef.current.value.trim()
                        const rank = newRankRef.current.value.trim()
                        const tel = newTelRef.current.value.trim()
                        if (name === '') {
                            alert('name cannot be empty')
                            newNameRef.current.value = ''
                            newNameRef.current.focus()
                        } else {
                            editClick(id, name, rank, tel)
                            handleCloseedit()
                        }
                    }}>
                        <span className='bi bi-plus-lg'>&nbsp;แก้ไข</span>
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* filters */}
            <div className='personal-filters-container'>
                <button className='btn btn-primary' onClick={() => handleShowadd()}>
                    <span className='bg-primary add'>เพิ่มรายการ</span>
                </button>
                <select className="form-select" aria-label="Default select example" defaultValue={10} style={{ width: '200px' }} onChange={(e) => setpersonalsPerPage(e.target.value)}
                    ref={personalsPerPageRef}
                >
                    <option value={5}>5 personals per page</option>
                    <option value={10} selected>10 personals per page</option>
                    <option value={50}>50 personals per page</option>
                    <option value={100}>100 personals per page</option>
                </select>
            </div>
            {/* table */}
            <table className='table table-striped'>
                <thead className='table-dark'>
                    <tr>
                        <th style={{ width: '5%' }} valign='middle'>จำนวน</th>
                        <th valign='middle'>ชื่อ</th>
                        <th>ตำแหน่ง</th>
                        <th>เบอร์ติดต่อ</th>
                        <th>แก้ไข</th>
                        <th style={{ textAlign: 'right', width: '20%' }} valign='middle'>ลบ</th>
                    </tr>
                </thead>

                <tbody>
                    {// personalsPerPage = 5
                        // curPage = 1
                        // personals (human) = [1, 2, 3, 4, 5]
                        // personals (js) = [0, 1, 2, 3, 4]
                        // personals (js) = [min, ..., max]
                        // min = (curPage - 1) * personalsPerPage
                        // max = (curPage * personalsPerPage) - 1
                        personals.filter((personal, index) => {
                            const min = (curPage - 1) * personalsPerPage
                            const max = (curPage * personalsPerPage) - 1
                            return index >= min && index <= max
                        })
                            .map((personal) => {
                                return (
                                    <tr key={personal.id}>
                                        <td valign='middle'><span className='badge bg-secondary' style={{ width: '3rem' }}>{personal.id}</span></td>
                                        <td style={{ textAlign: 'center' }} valign='middle'>{personal.name}</td>
                                        <td style={{ textAlign: 'center' }} valign='middle'>{personal.rank}</td>
                                        <td style={{ textAlign: 'center' }} valign='middle'>{personal.tel}</td>
                                        <td style={{ textAlign: 'center' }} valign='middle'>
                                            <button className='btn btn-primary' onClick={() => handleShowedit()}>
                                                <span className='bi bi-pencil'></span>
                                            </button>
                                        </td>
                                        <td style={{ textAlign: 'right' }} valign='middle'>
                                            <button className='btn btn-danger' onClick={() => deleteClcik(personal.id)}>
                                                <span className='bi bi-trash'></span>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}

                </tbody>
            </table>
            {/* page control */}
            <div>
                <button className='btn btn-outline-primary personal-space'
                    onClick={() => setCurPage(1)} disabled={curPage === 1}>First</button>
                <button className='btn btn-outline-primary personal-space'
                    onClick={() => curPage > 1 && setCurPage(curPage - 1)} disabled={curPage === 1}>Previous</button>
                <span className='personal-space'>{curPage}&nbsp;/&nbsp;{numPages}</span>
                <button className='btn btn-outline-primary personal-space'
                    onClick={() => curPage < numPages && setCurPage(curPage + 1)} disabled={curPage === numPages}>Next</button>
                <button className='btn btn-outline-primary personal-space'
                    onClick={() => setCurPage(numPages)} disabled={curPage === numPages}>Last</button>
            </div>
        </div >
    );
}

export default Personal;