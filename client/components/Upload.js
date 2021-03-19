import React, {useState} from 'react'

function Upload() {
  const [file, setFile] = useState(null)
  return (
    <div>
      <label>Upload your photo</label>
      <br />
      <input type="file" onChange={e => setFile(e.target.files[0])} />
    </div>
  )
}

export default Upload