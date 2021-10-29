import { useState, useEffect, useContext } from 'react';

const MemoryDetail = ( {currentMemory} ) => {
    const [memory,setMemory] = useState({
        title: "",
        photo: "",
        body: "",
        owner: '',
        event: ''
    });


    useEffect( () => {
        console.log('current Memory: ',currentMemory)
        if(currentMemory) {
            setMemory(previousState => {
            return{...previousState, ...currentMemory}
        })
    }
    }, [currentMemory])

    return (memory ?(
        <div className="memory-detail">
            <h1>{memory.title}</h1>
            <img style={{width: "100%"}} src={memory.photo} alt="alt" />
            <p>{memory.body}</p>
            
        </div>
    ) : <h1>Loading...</h1>
    );
};

export default MemoryDetail;