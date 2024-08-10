import { ImageT } from '../../types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import "./styles.css";

const ImageGrid = ({
    images
} : {
    images : ImageT[]
}) => {
  return (
    <div className='imageGrid_container'>
        {
            images.map((image) => (
                <div key={image.id} className='imageGrid_imageWrapper'>
                    <LazyLoadImage
                        style={{borderRadius: "5px", boxShadow: "3px 3px 5px rgba(116, 114, 114, 0.906)"}}
                        alt="dummy-images"
                        height={250}
                        width={250}
                        src={image.download_url}
                        effect='blur'
                        />
                </div>
            ))
        }
    </div>
  )
}

export default ImageGrid