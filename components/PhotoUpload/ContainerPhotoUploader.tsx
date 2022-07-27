import { ChakraProvider, Box } from "@chakra-ui/react";

import React, { useState, useEffect } from "react";
import { Stack, Image } from "@chakra-ui/react";

const ContainerPhotoUploader = ({ children, setPhotos }: any) => {
  const [images, setImages] = useState([]);
  const [imagesURLs, setImagesURLs] = useState([
    {
        id: 0,
        url: '',
        image: null,
        acceptInput: true
    },
    {
        id: 1,
        url: '',
        image: null,
        acceptInput: false
    },
    {
        id: 2,
        url: '',
        image: null,
        acceptInput: false
    },
    {
        id: 3,
        url: '',
        image: null,
        acceptInput: false
    },
    {
        id: 4,
        url: '',
        image: null,
        acceptInput: false
    },
]);

//   useEffect(() => {
//     //setImages()
//     return;
//     if (images.length < 1) return;
//     const newImagesUrls = [
//         {
//             id: 0,
//             url: null
//         },
//         {
//             id: 1,
//             url: null
//         },
//         {
//             id: 2,
//             url: null
//         },
//         {
//             id: 3,
//             url: null
//         },
//         {
//             id: 4,
//             url: null
//         },
//     ];

//     images.forEach((image) => newImagesUrls.push(URL.createObjectURL(image)));
//     setImagesURLs(newImagesUrls);
//   }, [imagesURLs]);

  const onImageChange = (e: any, index: any) => {
    validateFile(e.target.files[0]);
    console.log(e);
    console.log(index);
    console.log(imagesURLs);
    setImagesURLs(oldImagesURLs => {
        oldImagesURLs[index] = {
            ...oldImagesURLs[index],
            url: URL.createObjectURL(e.target.files[0]),
            image: e.target.files[0],
            acceptInput: false
        }
        if (index + 1 < imagesURLs.length) {
            oldImagesURLs[index + 1] = {
                ...oldImagesURLs[index + 1],
                acceptInput: true
            }
        }
        setPhotos(oldImagesURLs.map(_ => _.image));
        return [...oldImagesURLs];
    });
  };

  const validateFile = (file: File) => {
    const fsMb = file.size / (1024 * 1024)
    const MAX_FILE_SIZE = 10
    if (fsMb > MAX_FILE_SIZE) {
    return alert('Max file size 10mb');
    }
    
    return true
  }

  return (

      <Box>

          {/* <input
            type="file"
            multiple
            accept="image/*"
            onChange={onImageChange}
          /> */}
          {/* <label className="flex justify-center flex-col cursor-pointer w-32 h-24 items-center border-4 border-solid">
            <input className="hidden" type="file"
                multiple
                accept="image/*"
                onChange={onImageChange}/>
            <i className="fa fa-cloud-upload"></i> 
            <span className="w-full text-center">
                Custom Upload
            </span>
          </label> */}

          <Stack direction="row">
            {imagesURLs.map((imageSrc, i) => {
              return (
                
                //   <Image
                //     key={i}
                //     className="test1"
                //     boxSize="100px"
                //     objectFit="cover"
                //     src={imageSrc}
                //     alt={i.toString()}
                //   />
                <Box key={i}>
                    {imageSrc.url &&
                    <Box className="flex justify-center flex-col w-32 h-24 items-center border-4 border-solid">
                            <Image
                                key={i}
                                boxSize="100px"
                                objectFit="cover"
                                src={imageSrc.url}
                                alt={i.toString()}
                            />
                    </Box>
                          
                    }
                    {imageSrc.acceptInput && 
                        <label className="flex justify-center flex-col cursor-pointer w-32 h-24 items-center border-4 border-solid">
                        <input className="hidden" type="file"
                            accept="image/*"
                            // onChange={onImageChange(event, i)}
                            onChange={(e) => onImageChange(e, i)}
                            />
                        <i className="fa fa-cloud-upload"></i> 
                        <span className="w-full text-center">
                            Custom Upload
                        </span>
                    </label>
                    } 

                    {!imageSrc.acceptInput && !imageSrc.url && 
                        <label className="flex justify-center flex-col w-32 h-24 items-center border-4 border-solid">
                        
                        <i className="fa fa-cloud-upload"></i> 
                        <span className="w-full text-center">
                            CaNOT upload
                        </span>
                    </label>
                    } 

                </Box>

              );
            })}
          </Stack>

        </Box>
  );
}

export default ContainerPhotoUploader;