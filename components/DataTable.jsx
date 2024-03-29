import Table from 'react-bootstrap/Table';


function BasicExample({data}) {

 
  return (
    <Table striped bordered hover>
      
                <thead>
                    <tr>
                        <th>#id</th>
                        <th>date</th>
                        <th>a</th>
                        <th>b</th>
                        <th>c</th>
                        <th>d</th>
                    </tr>
                </thead>
            


      <tbody>
      {data.map((item) => (
     // Check if 'a' exists and has a value
        <tr key={item.id}>
            <td>{item._id}</td>
            <td>{item.date}</td>
            <td>{item.a}</td>
            <td>{item.b}</td>
            <td>{item.c}</td>
            <td>{item.d}</td>
        </tr>
     // Render nothing if 'a' is missing or falsy
))}




        
      </tbody>
    </Table>
  );
}

export default BasicExample;