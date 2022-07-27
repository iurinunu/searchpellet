import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

import Feedback from '@/components/Feedback';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';
import { getAllFeedback, getAllSellerAds, getAllSites, getSellerAd } from '@/lib/db-admin';

export async function getStaticProps(context: any) {
  const siteId = context.params.siteId;
  // const { ad } = await getSellerAd(siteId);
  console.log('caskljdfnhkadjsnfkdjsbnfkdjs')
  // console.log(ad);
  return {
    props: {
      initialFeedback: {}
    },
    revalidate: 1
  };
}

export async function getStaticPaths() {
  
  const { ads } = await getAllSellerAds();
  const paths = ads.map((ad: any) => ({
    params: {
      siteId: ad.id.toString()
    }
  }));

  return {
    paths,
    fallback: true // to not 404 if not known siteId passed
  };
}

const FeedbackPage = ({ initialFeedback }: any) => {
  const auth: any = useAuth();
  const router = useRouter();
  const inputEl = useRef(null);
  const [allFeedback, setAllFeedback] = useState(initialFeedback);

  const onSubmit = (e: any) => {
    e.preventDefault();

    const newFeedback = {
      author: auth!.user.name,
      authorId: auth!.user.uid,
      siteId: router?.query.siteId,
     // text: inputEl?.current.value,
      createdAt: new Date().toISOString(),
      provider: auth?.user.provider,
      status: 'pending'
    };

   // inputEl!.current.value = '';
    // here we're updating the state of the cmpnt before knowing if the creation was successfull, needs refactor: "Optimistic UI"
    setAllFeedback([newFeedback, ...allFeedback]); // when we update the state pass all the new stuff with the old one as well
    createFeedback(newFeedback);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      <p>
        {JSON.stringify(initialFeedback)}
      </p>
      {auth?.user && (
        <Box as="form" onSubmit={onSubmit}>
          <FormControl my={8}>
            <FormLabel htmlFor="comment">Comment</FormLabel>
            <Input ref={inputEl} id="comment" placeholder="Leave a comment" />
            <Button
              mt={4}
              type="submit"
              fontWeight="medium"
              isDisabled={router.isFallback}
            >
              Add Comment
            </Button>
          </FormControl>
        </Box>
      )}
      {/* {allFeedback &&
        allFeedback.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} />
        ))} */}
    </Box>
  );
};

export default FeedbackPage;