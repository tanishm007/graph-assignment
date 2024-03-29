import Table from 'react-bootstrap/Table';


function BasicExample({data}) {


  return (
    <Table striped bordered hover>
     
{ ( 
                <thead>
                    <tr>
                        <th>#id</th>
                        <th>date</th>
                        <th>e</th>
                        <th>f</th>
                        <th>g</th>
                        <th>h</th>
                    </tr>
                </thead>
            )}
      <tbody>
   
{data.map((item) => (
   ( // Check if 'a' exists and has a value
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.date}</td>
            <td>{item.e}</td>
            <td>{item.f}</td>
            <td>{item.g}</td>
            <td>{item.h}</td>
        </tr>
    )   // Render nothing if 'a' is missing or falsy
))}


        
      </tbody>
    </Table>
  );
}

export default BasicExample;