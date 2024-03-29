import { Box, HStack, Text, useTheme, VStack, Circle, Pressable, IPressableProps } from 'native-base';
import { ClockAfternoon, Hourglass, CircleWavyCheck } from 'phosphor-react-native'

export type TicketProps = {
  id: string;
  title: string;
  patrimony_number: number;
  when: string;
  status: 'open' | 'closed';
}

type Props = IPressableProps & {
  data: TicketProps;
}

export function Ticket({ data, ...rest}: Props) {

  const { colors } = useTheme()

  const statusColor = data.status === 'open' ? colors.secondary[700] : colors.blue[300]

  return (
    <Pressable {...rest}>
      <HStack 
        bg='gray.600'
        mb={4}
        alignItems='center'
        justifyContent='space-between'
        rounded='sm'
        overflow='hidden'
      >
        <Box h='full' w={2} bg={statusColor}></Box>

        <VStack flex={1} my={5} ml={5}>
          <Text color='white' fontSize='md'>
            {data.title}
          </Text>

          <HStack alignItems='center'>
            <ClockAfternoon size={15} color={colors.gray[300]} />
            <Text color='gray.300' fontSize='xs' ml={1}>
              {data.when}
            </Text>
          </HStack>
        </VStack>

        <Circle bg='gray.500' h={12} w={12} mr={5}>
          {
            data.status === 'open'
              ? <Hourglass size={24} color={statusColor} />
              : <CircleWavyCheck size={24} color={statusColor} />
          }
        </Circle>
        
      </HStack>
    </Pressable>
  );
}