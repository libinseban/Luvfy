import React, { useState, useEffect } from "react";
import { 
  Box, 
  Container,
  Heading,
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  Stack,
  useToast
} from "@chakra-ui/react";
import { profileService } from "../services/profileService";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    location: ''
  });
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await profileService.getProfile();
      setProfile(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load profile",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await profileService.updateProfile(profile);
      toast({
        title: "Success",
        description: "Profile updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) return <Box>Loading...</Box>;

  return (
    <Container maxW="container.md" py={10}>
      <Heading mb={6}>Profile</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Input
              name="bio"
              value={profile.bio}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              name="location"
              value={profile.location}
              onChange={handleChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal">
            Save Changes
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default Profile;
