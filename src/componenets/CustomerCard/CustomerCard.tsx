import { customerT } from '../../types';
import './styles.css';


const CustomerCard = ({
    customer,
    clickHandler,
    id,
    selected 
}: {
    customer : customerT,
    clickHandler : (customer : customerT, id : Number) => void,
    id : Number,
    selected : Boolean
}) => {

  return (
    <div 
      onClick={() => clickHandler(customer,id)} 
      key={customer.id} 
      className='customerCard'
      style={selected === true ? {backgroundColor : " #cccccc", borderRight: "3px solid black"} : {}}>
        <div className='customerCard--header'>{`${customer.firstName} ${customer.lastName}`}</div>
        <div className='customerCard--details'>
        <span>
            {customer.company.department} - {" "}
            {customer.company.title}
        </span> 
        {customer.email}
        </div>
    </div>
  )
}

export default CustomerCard