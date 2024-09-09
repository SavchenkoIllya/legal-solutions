'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  GroupsForm as GroupsFormType,
  GroupsSchema,
} from '@/app/api/interfaces/groups/schema';
import { useEffect, useState } from 'react';
import { Post } from '@/app/api/interfaces/posts/types';
import {
  createGroup,
  updateGroup,
} from '@/app/api/interfaces/groups/groups.api';
import { Groups } from '@/app/api/interfaces/groups/types';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CircularProgress,
  Divider,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import { CustomButton } from '@/app/admin/components/login';
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import { green, red } from '@mui/material/colors';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

type GroupsFormProps = { posts: Post[]; groupData?: Groups | undefined };

export default function GroupsForm({ posts, groupData }: GroupsFormProps) {
  const {
    register,
    setError,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
  } = useForm<GroupsFormType>({
    resolver: zodResolver(GroupsSchema),
    defaultValues: groupData ? { ...groupData } : {},
  });

  const mapDefaultSelected = () =>
    posts.filter((item) => groupData?.posts_id.includes(item.id));

  const [selected, setIsSelected] = useState<Post[]>([]);

  useEffect(() => {
    if (groupData?.posts_id) setValue('posts_id', groupData?.posts_id);
    setIsSelected(mapDefaultSelected());
  }, []);

  useEffect(() => {
    const postsToId = selected.reduce((acc: number[], el: Post): number[] => {
      acc.push(el.id);
      return acc;
    }, []);
    setValue('posts_id', postsToId);
  }, [selected]);

  const onSubmit: SubmitHandler<GroupsFormType> = async (
    formData: GroupsFormType
  ) => {
    try {
      if (groupData?.id) {
        // console.log(formData);
        await updateGroup(formData, groupData.id);
      } else {
        await createGroup(formData);
      }
      reset();
    } catch (error) {
      setError('root', {
        type: 'server',
        message: String(error),
      });
    }
  };

  // const theme = useTheme();
  const [checkedPosts, setCheckedPosts] = useState<any[]>([]);

  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;

    const selectedPosts = posts.filter((post) => value.includes(post.id));

    // TODO: Add function that adds this array to formData
    setCheckedPosts(selectedPosts);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2}>
        <Typography variant="h5" fontWeight="bold">
          {groupData?.id
            ? `Update group: ${groupData.id} ${groupData.title_ru}`
            : 'Create group'}
        </Typography>
        <Divider />
        <TextField
          label="Title in russian"
          required
          type="text"
          size="small"
          sx={{ width: '100%' }}
          placeholder="Title in russian"
          error={!!errors.title_ru}
          helperText={errors.title_ru?.message}
          id="title_ru"
          {...register('title_ru')}
        />
        <TextField
          label="Title in ukrainian"
          type="text"
          size="small"
          sx={{ width: '100%' }}
          placeholder="Title in ukrainian"
          error={!!errors.title_ua}
          helperText={errors.title_ua?.message}
          id="title_ua"
          {...register('title_ua')}
        />
        <TextField
          label="Title in polish"
          type="text"
          size="small"
          sx={{ width: '100%' }}
          placeholder="Title in polish"
          error={!!errors.title_pl}
          helperText={errors.title_pl?.message}
          id="title_pl"
          {...register('title_pl')}
        />
        <TextField
          label="Title in english"
          type="text"
          size="small"
          sx={{ width: '100%' }}
          placeholder="Title in english"
          error={!!errors.title_en}
          helperText={errors.title_en?.message}
          id="title_en"
          {...register('title_en')}
        />

        <Select
          labelId="demo-simple-select-label"
          id="category"
          defaultValue={'private'}
          label="Category"
          {...register('category')}
        >
          <MenuItem value={'private'}>Private</MenuItem>
          <MenuItem value={'business'}>Business</MenuItem>
        </Select>

        <TextField
          label="Description in russian"
          type="text"
          size="small"
          sx={{ width: '100%' }}
          placeholder="Description in russian"
          error={!!errors.description_ru}
          helperText={errors.description_ru?.message}
          id="description_ru"
          {...register('description_ru')}
        />

        <TextField
          label="Description in ukrainian"
          type="text"
          size="small"
          sx={{ width: '100%' }}
          placeholder="Description in ukrainian"
          error={!!errors.description_ua}
          helperText={errors.description_ua?.message}
          id="description_ua"
          {...register('description_ua')}
        />

        <TextField
          label="Description in polish"
          type="text"
          size="small"
          sx={{ width: '100%' }}
          placeholder="Description in polish"
          error={!!errors.description_pl}
          helperText={errors.description_pl?.message}
          id="description_pl"
          {...register('description_pl')}
        />

        <TextField
          label="Description in english"
          type="text"
          size="small"
          sx={{ width: '100%' }}
          placeholder="Description in english"
          error={!!errors.description_en}
          helperText={errors.description_en?.message}
          id="description_en"
          {...register('description_en')}
        />

        <TextField
          label="Price range"
          type="text"
          size="small"
          sx={{ width: '100%' }}
          error={!!errors.price_range}
          helperText={errors.price_range?.message}
          id="price_range"
          placeholder="Type Price range here"
          {...register('price_range')}
        />

        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">Posts</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            // В качестве value передаем id выбранных постов
            value={checkedPosts.map((post) => post.id)}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selectedIds) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {checkedPosts.map((post) => (
                  <Chip key={post.id} label={post.title_ru} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {posts?.map((post) => (
              <MenuItem key={post.id} value={post.id}>
                {post.title_ru}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {isSubmitSuccessful && (
          <Typography color={green[500]}>
            {groupData?.id ? 'Updated' : 'Created'} successfully
          </Typography>
        )}
        {errors.root && (
          <Typography color={red[500]}>{errors.root.message}</Typography>
        )}
        <CustomButton
          type="submit"
          disabled={!isValid}
          variant="contained"
          color="primary"
          sx={{ width: '-webkit-fit-content' }}
        >
          {groupData?.id ? 'Update' : 'Create'}
          {isSubmitting && (
            <span className="mr-4">
              <CircularProgress size="20px" />
            </span>
          )}
        </CustomButton>
      </Stack>
    </form>
  );
}
