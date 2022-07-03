import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Heading, Flex, Text, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Select, Box, useRadio, useRadioGroup, HStack } from '@chakra-ui/react';
import { useLoadScript, GoogleMap, Marker, Circle, Polygon } from "@react-google-maps/api";

import { useForm } from 'react-hook-form';
import { placeCoordinates } from 'types/place-search';
import PlacesAutocomplete from './PlacesAucomplete';


export const libraries = String(['places']);

const ClientSearchForm = () => {

	const [propertyDetails, setPropertyDetails] = useState<placeCoordinates>();
	const [bagsNumber, setBagsNumber] = useState<number>(1);
	const [radiusKmNumber, setRadiusKmNumber] = useState<number>(15);
	const [weight, setWeight] = useState<string>('15 Kg');
	const [shipping, setShipping] = useState<boolean>(false);

	const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY!,
    libraries: ["drawing" ,"geometry" , "localContext" , "places" ,"visualization"],
  });

	// --------------
	
	const [map, setMap] = useState<google.maps.Map | null>(null);

  	const onLoad = useCallback((map: google.maps.Map) => setMap(map), []);	
	const [circle, setCircle] = useState<google.maps.Circle | null>(null);
	const [radius, setRadius] = useState<number | null>(null);
	const [center, setCenter] = useState<any | null>(null);


  const onLoadCircle = useCallback((circle) => setCircle(circle), []);

  useEffect(() => {
	  console.log('radius');
	  console.log(radius);
	  console.log('center');
	  console.log(center);
    if (map && circle) {
		console.log('map');
		console.log(map);
		 map.fitBounds(circle.getBounds()!)

    }
	
  }, [map, circle, radius, center]);


	// radio stuff
	const optionsRadio = ['Vai tu', 'Spedito']

	const { getRootProps, getRadioProps } = useRadioGroup({
		name: 'framework2',
		defaultValue: 'Vai tu',
		onChange: (x) => {
			console.log(x);
			if (x === 'Vai tu') {
				setShipping(false);
			} else {
				setShipping(true);
			}
		},
	})

    const group = getRootProps()


  

	// ----------





	const onPropertyDetailsChange = (x: placeCoordinates) => {
    console.log('property details changed');
    console.log(x);
    // update state leaving previous values of the object
  //   setPropertyDetails(prevState => ({
  //     ...prevState,
  //     ...x
  //  }));
	setPropertyDetails(x);
    // console.log(propertyDetails);
		console.log((x?.lat));
		console.log((x?.lng));

  }

  

	const options = {
		strokeColor: '#E98735',
		strokeOpacity: 0.5,
		strokeWeight: 4,
		fillColor: '#E9A535',
		fillOpacity: 0.35,
		clickable: false,
		draggable: false,
		editable: false,
		visible: true,
	//	radius: 30000, // 30 mila metri: 30km
		zIndex: 1
	}


    return (
			<Flex
				width="100%"
				backgroundColor="white"
				borderRadius="8px"
				p={16}
				justify="center"
				align="start"
				direction="column"
			>
				<Heading size="lg" mb={2}>
					Ricerca Pellet
				</Heading>
				<Text mb={4}>Let’s get started.</Text>


				<Flex gap='3rem' paddingBottom='1rem' align='center'>
					<Flex align='center'>
						<Text paddingRight='1rem' fontSize='lg'>Numero Sacchi: </Text>
						<NumberInput
							defaultValue={1}
							max={1000}
							min={1}
							maxW={20}
							keepWithinRange={false}
							clampValueOnBlur={false}
							onChange={(e) => setBagsNumber(parseInt(e))}
						>
							<NumberInputField background='gray.200'/>
							<NumberInputStepper>
								<NumberIncrementStepper borderColor='gray.300'/>
								<NumberDecrementStepper	borderColor='gray.300'/>
							</NumberInputStepper>
						</NumberInput>
					</Flex>
					
					<Flex align='center'>
						<Text paddingRight='1rem' fontSize='lg'>Kg/Sacco: </Text>
						<Select maxW='100%' background='gray.200' defaultValue='15 Kg' placeholder='Select option' onChange={(e) => setWeight(e.target.value)}>
							<option value='15 Kg'>15 Kg</option>
							<option value='7 Kg'>7 Kg</option>
						</Select>
					</Flex>

					
				</Flex>

				{/* <Flex paddingBottom='1rem' align='center'>
					
				</Flex> */}

				<Flex width='100%' height='100%'>
					<Box>
						<Flex paddingBottom='1rem' align='center'>
							<Text paddingRight='2rem' fontSize='lg'>Indirizzo: </Text>
							<PlacesAutocomplete setPropertyDetails={onPropertyDetailsChange} isLoaded={isLoaded}></PlacesAutocomplete>
						</Flex>

						<Flex paddingBottom='1rem' align='center'>
							<Text paddingRight='2rem' fontSize='lg'>Come: </Text>
							<HStack {...group}>
								{optionsRadio.map((value) => {
									const radio = getRadioProps({ value })
									return (
										<RadioCard key={value} {...radio}>
											{value}
										</RadioCard>
									)
								})}
							</HStack>
						</Flex>
				
						{!shipping &&  <Flex paddingBottom='1rem' align='center'>
							<Text paddingRight='2rem' fontSize='lg'>Raggio da casa: </Text>
							<NumberInput
								defaultValue={radiusKmNumber}
								max={1000}
								min={1}
								keepWithinRange={true}
								clampValueOnBlur={false}
								onChange={(e) => setRadiusKmNumber(parseInt(e))}
							>
								<NumberInputField background='gray.200'/>
								<NumberInputStepper>
									<NumberIncrementStepper borderColor='gray.300'/>
									<NumberDecrementStepper	borderColor='gray.300'/>
								</NumberInputStepper>
							</NumberInput>
						</Flex>}

					</Box>

							{isLoaded && propertyDetails?.description &&
											<Box width='100%' paddingBottom='1rem'>

								<Flex width='100%' justifyContent='center' height='180%'>
							<GoogleMap 
								zoom={10} 
								center={{lat: propertyDetails?.lat!, lng: propertyDetails?.lng!}}
								onLoad={onLoad}
								mapContainerClassName='map-container'
							>
					
					{/* <Polygon
						paths={paths}
						options={options}
						/> */}
									{/* <Marker position={{ lat: 4.1805814, lng: 9.5696 }} /> */}
									<Marker
										title="Hello World!"
										position={{ lat: propertyDetails?.lat, lng: propertyDetails?.lng }}
										/>
									{!shipping && <Circle 
									onLoad={onLoadCircle} 
									center={{ lat: propertyDetails?.lat, lng: propertyDetails?.lng }}
									options={{ ...options, radius: radiusKmNumber * 1000 }} 
									onUnmount={(circle) => setCircle(null)}
									onCenterChanged={() => circle && setRadius(circle.getRadius())}
									onRadiusChanged={() => circle && setRadius(circle.getRadius())}
									/>
									}
								
							</GoogleMap>
								</Flex>
								</Box>

							}

				</Flex>

				

				
				
				
				

				<Text>
					Sacchi: {bagsNumber}
				</Text>
				<Text>
					Kg/Sacco: {weight}
				</Text>
				<Text>
					Indirizzo: {propertyDetails?.description}
				</Text>
				<Text>
					Spedito: {shipping.toString()}
				</Text>
				<Text>
					Raggio Km da casa: {radiusKmNumber} Km
				</Text>
				<Button>
					Cerca
				</Button>
			</Flex>
		)


		// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}

	}


export default ClientSearchForm;