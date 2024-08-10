import {useEffect, useState } from 'react';
import ImageGrid from '../ImageGrid/ImageGrid';
import CustomerCard from '../CustomerCard/CustomerCard';
import { customerT, ImageT } from '../../types';
import "./styles.css";

let count=0;

const nine_images = (
  images : ImageT[],
  func : (img : ImageT[]) => void
) => {
  let tempArr = []
  for(let i=count; i<count+9; i++){
    tempArr.push(images[i]);
  }
  func(tempArr);
  if(count >= images.length-10) count = 0;
  else count = count + 9;
}

const Dashboard = () => {
    
    const [customers, setCustomers] = useState<customerT[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<customerT | null>(null);
    const [images, setImages] = useState<ImageT[]>([]);
    const [visibleImages, setVisibleImages] = useState<ImageT[]>([]);

    const [isSelected, setIsSelected] = useState<Boolean[]>([]);

    useEffect(() => {
      // Fetching users data from dummyjson/users api
      fetch('https://dummyjson.com/users')
        .then(res => res.json())
        .then(res => {
          setCustomers(res.users);
          setIsSelected(Array(res.users.length).fill(false));
        });

      // Fetching images 
      fetch('https://picsum.photos/v2/list?page=2&limit=100')
      .then(res => res.json())
      .then(res => setImages(res))
    }, [])

    useEffect(() => {
      if(images.length > 0 && selectedCustomer !== null){
       nine_images(images, setVisibleImages);
      }
    }, [selectedCustomer, images])

    // This changes the images in image grid every 10 seconds using setInterval
    useEffect(() => {
      if(images.length > 0 && selectedCustomer !== null){
        const intervalId = setInterval(() => nine_images(images, setVisibleImages), 10000)
        return () => clearInterval(intervalId);
       }
    }, [images, selectedCustomer])

    const customerCardClickHandler = (customer : customerT, customerId:Number) : void => {
      setSelectedCustomer(customer);
      
      let updatedState = isSelected.map((_,id) => {
        if(id === customerId) return true;
        else return false;
      })
      console.log(customerId);
      setIsSelected(updatedState);
    }

  return (
    <>
        <div className="dashboard_container">
            <section className='dashboard_customerList'>
              <div>
                {
                  customers.map((customer,id) => (
                    <CustomerCard 
                      key={customer.id} 
                      customer={customer} 
                      clickHandler={customerCardClickHandler}
                      selected={isSelected[id]}
                      id={id} />
                  ))
                }
              </div>
            </section>
            <section className='dashboard_customerDetails'>
                {
                  selectedCustomer !== null ? (
                    <div className='dashboard_customerDetails--container'>
                      <div className='dashboard_customerDetails--header'>
                        <img src={selectedCustomer.image} alt='customer_image' />
                        <div>
                          <div>{`${selectedCustomer.firstName} ${selectedCustomer.lastName}`}</div>
                          <span style={{fontSize : "18px", letterSpacing: "1px"}}>{selectedCustomer.company.department} - {selectedCustomer.company.title}</span>
                        </div>
                      </div>
                      <div className="dashboard_customerDetails--details">
                        <div className='dashboard_customerDetails--personalInfo'>
                            <span>First Name : {selectedCustomer.firstName} </span> 
                            <span>Maiden Name : {selectedCustomer.maidenName === "" ? "N/A" : selectedCustomer.maidenName} </span> 
                            <span>Last Name : {selectedCustomer.lastName}</span>
                            <span>DOB : {selectedCustomer.birthDate}</span>
                            <span>Age : {selectedCustomer.age}</span>
                            <span>Phone no : {selectedCustomer.phone}</span>
                            <span>Street : {selectedCustomer.address.address} </span>
                            <span>City : {selectedCustomer.address.city} </span>
                            <span>State : {selectedCustomer.address.state} </span>
                            <span>Pincode : {selectedCustomer.address.postalCode} </span>
                        </div>
                      </div>
                      <ImageGrid images={visibleImages} />
                    </div>
                  ): null
                }
            </section>
        </div>
    </>
  )
}

export default Dashboard