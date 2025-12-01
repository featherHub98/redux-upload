import {useState,useEffect} from "react"


interface StoredFile  {
          id: number,
          name : string,
          type : string,
          data : string
        };

export default function UploadPage() {
 
    const [files,setFiles] = useState<StoredFile[]>([])
    const [error,setError] = useState('')
    useEffect (()=>{
      const storedValue = localStorage.getItem('my_stored_files');
      let savedFiles= []
      if (storedValue != null){
        savedFiles = JSON.parse(storedValue)
      }
      setFiles(savedFiles)
    },[]);
    const handleUpload = (e:any)=>{
      const selectedFile = e.target.files[0];
      setError('');
      if (!selectedFile) return ;
      if(selectedFile.size > 10240){
        setError("Error : File larger than 10KB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const newFile = {
          id: Date.now(),
          name : selectedFile.name,
          type : selectedFile.type,
          data : (event.target!.result as string)
        };
        const updatedFiles = [...files,newFile]
        setFiles(updatedFiles)
        try {
        localStorage.setItem("my_stored_files",JSON.stringify(updatedFiles))
      } catch (error) {
        setError("Storage quota exceeded! Clear some files.");
      }
      };
      reader.readAsDataURL(selectedFile);
    };
    const deleteFile = (id:number) => {
    const updatedFiles = files.filter(file => file.id !== id);
    setFiles(updatedFiles);
    localStorage.setItem('my_stored_files', JSON.stringify(updatedFiles));
  };


  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px' }}>
      <h2>Local Storage File Manager</h2>
      
     
      <div style={{ border: '2px dashed #ccc', padding: '20px', marginBottom: '20px' }}>
        <input type="file" onChange={handleUpload} />
        <p style={{ fontSize: '0.8rem', color: '#666' }}>Max size: 10KB</p>
        {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
      </div>

      
      <h3>Stored Files ({files.length})</h3>
      
      {files.length === 0 && <p>No files stored yet.</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {files.map((file) => (
          <li key={file.id} style={{ 
              borderBottom: '1px solid #eee', 
              padding: '10px 0', 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            
            <span>{file.name}</span>
            
            <div>
             
              {/* We use the Base64 data directly as the href */}
              <a 
                href={file.data} 
                download={file.name} // This attribute forces the browser to download
                style={{ textDecoration: 'none', marginRight: '10px', color: 'blue' }}
              >
                Download
              </a>

              <button 
                onClick={() => deleteFile(file.id)}
                style={{ color: 'red', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
