import PropTypes, { useEffect, useState } from "react";
import {
  Stack,
  Text,
  Box,
  Flex,
  Divider,
  UnorderedList,
  ListItem,
  HStack,
} from "@chakra-ui/react";
import PlayAudio from "./PlayAudio";
import { fetchData } from "../api";

const Content = ({ searchTerm }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (searchTerm) {
        try {
          const result = await fetchData(searchTerm);
          setData(result);
          setError(null);
        } catch (error) {
          console.error(error);
          setError(error);
        }
      }
    };
    getData();
  }, [searchTerm]);

  console.log("data", data);
  console.log("error", error);

  return (
    <Stack pt={10} pb={10} flexDirection={"column"}>
      {searchTerm && data && !error && (
        <>
          <Flex justifyContent={"space-between"} flex={"auto"}>
            <Box>
              <Text fontSize="5xl" as={"b"}>
                {searchTerm}
              </Text>
              <Stack>
                <Text fontSize="lg" color={"purple"}>
                  {data[0].phonetic}
                </Text>
              </Stack>
            </Box>
            <PlayAudio />
          </Flex>
          <Stack mt={6}>
            <Flex gap={6}>
              <Text fontSize="xl" fontStyle="italic" fontWeight="bold">
                {data[0].meanings[0].partOfSpeech}
              </Text>
              <Divider orientation="horizontal" alignSelf={"center"} />
            </Flex>
            <Flex mt={6} flexDirection={"column"}>
              <Text sx={{ color: "var(--gray)" }}>Meaning</Text>
              <UnorderedList>
                {data[0].meanings[0].definitions.map((definition, index) => (
                  <ListItem key={index} mt={4}>
                    {definition.definition}
                  </ListItem>
                ))}
              </UnorderedList>
              <HStack mt={6}>
                <Text sx={{ color: "var(--gray)" }}>Synonyms</Text>
                <Text as={"b"} color={"purple"}>
                  {data[0].meanings[0].synonyms}
                </Text>
              </HStack>
            </Flex>
            <Flex gap={6} mt={6}>
              <Text fontSize="xl" fontStyle="italic" fontWeight="bold">
                {data[0].meanings[1].partOfSpeech}
              </Text>
              <Divider orientation="horizontal" alignSelf={"center"} />
            </Flex>
            <Flex mt={6} flexDirection={"column"}>
              <Text sx={{ color: "var(--gray)" }}>Meaning</Text>
              <UnorderedList>
                {data[0].meanings[1].definitions.map((definition, index) => (
                  <ListItem key={index} mt={4}>
                    {definition.definition}
                  </ListItem>
                ))}
              </UnorderedList>
            </Flex>
          </Stack>
        </>
      )}
      {searchTerm && error && (
        <Stack>
          <Text fontSize="5xl" as={"b"}>
            {error.response.data.title}
          </Text>
          <Text>{error.response.data.message}</Text>
        </Stack>
      )}
    </Stack>
  );
};

export default Content;

Content.propTypes = {
  searchTerm: PropTypes.string,
};
