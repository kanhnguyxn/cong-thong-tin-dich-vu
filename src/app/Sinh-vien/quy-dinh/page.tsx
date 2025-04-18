'use client'


import NavBar from './Navbar'
import QuyDinhTable from './QuyDinhTable'
import dataQuyDinh from '../../services/dataQuyDinh';
import React from 'react';


export default function QuyDinhPage() {
    const [department, setDepartment] = React.useState('');
    const [option, setOption] = React.useState('');
    const handleSelectionsChange = (department: string, option: string) => {
        setDepartment(department);
        setOption(option);
    }
    return (
        <div className="flex flex-1 w-full justify-between">
                <div className="md:w-[25%] lg:w-[20%]  h-full">
                    <NavBar onSelectionsChange={handleSelectionsChange}/>
                </div>
                <div className='lg: w-[75%] justify-center align-center'>
                    <h5 className='w-full text-center uppercase font-semibold text-[var(--color-blue)] text-lg md:text-2xl'>{option}</h5>
                    <QuyDinhTable data={dataQuyDinh}/>
                </div>
        </div>
    )
}