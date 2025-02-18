import { useMemo } from 'react';
import { Loader, NumberInput, TextInput, Tooltip } from '@mantine/core';
import { IconAlignBoxLeftMiddle, IconArrowsSort, IconFilter, IconSearch } from '@tabler/icons-react';
import clsx from 'clsx';
import { UseFormReturnType } from '@mantine/form';
import { useTranslation } from 'react-i18next';

type Props = {
  isFetching?: boolean;
  searchForm: UseFormReturnType<{
    q: string;
    offset: number;
    limit: number;
    filter: string;
    sort: string;
    indexId?: string;
  }>;
  searchFormError: string | null;
  onFormSubmit: () => void;
  submitBtnText: string;
  indexIdEnable?: boolean;
};

export const SearchForm = ({
  isFetching = false,
  searchForm,
  searchFormError,
  onFormSubmit,
  submitBtnText,
  indexIdEnable = false,
}: Props) => {
  const { t } = useTranslation('document');

  return useMemo(
    () => (
      <form className={`flex flex-col gap-2 `} onSubmit={onFormSubmit}>
        <div className={clsx('prompt danger ghost xs', !searchFormError && 'hidden')}>
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-alert-triangle"
              width={18}
              height={18}
              viewBox="0 0 24 24"
              stroke-width={2}
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M10.24 3.957l-8.422 14.06a1.989 1.989 0 0 0 1.7 2.983h16.845a1.989 1.989 0 0 0 1.7 -2.983l-8.423 -14.06a1.989 1.989 0 0 0 -3.4 0z"></path>
              <path d="M12 9v4"></path>
              <path d="M12 17h.01"></path>
            </svg>
          </div>
          <div className="content">
            <p>{searchFormError}</p>
          </div>
        </div>
        {indexIdEnable && (
          <TextInput
            leftSection={<IconAlignBoxLeftMiddle size={16} />}
            radius="md"
            placeholder={t('search.form.indexId.placeholder')}
            required
            {...searchForm.getInputProps('indexId')}
          />
        )}
        <TextInput
          leftSection={<IconSearch size={16} />}
          autoFocus
          radius="md"
          placeholder={t('search.form.q.placeholder')}
          {...searchForm.getInputProps('q')}
        />
        <div className={`flex items-center gap-4`}>
          <TextInput
            className={`flex-1`}
            label={t('search.form.filter.label')}
            leftSection={<IconFilter size={16} />}
            radius="md"
            {...searchForm.getInputProps('filter')}
          />
          <Tooltip position={'bottom-start'} label={t('search.form.sort.tip')}>
            <TextInput
              className={`flex-1`}
              label={t('search.form.sort.label')}
              leftSection={<IconArrowsSort size={16} />}
              radius="md"
              {...searchForm.getInputProps('sort')}
            />
          </Tooltip>
        </div>
        <div className={`flex items-stretch gap-4`}>
          <NumberInput radius="md" label={t('search.form.limit.label')} {...searchForm.getInputProps('limit')} />
          <NumberInput radius="md" label={t('search.form.offset.label')} {...searchForm.getInputProps('offset')} />

          {/* right btn group */}
          <div className={`ml-auto mt-auto flex gap-x-4 items-center`}>
            {isFetching && <Loader color="gray" size="sm" />}

            {/* submit btn */}
            <button type={'submit'} className={`btn solid primary bg-gradient-to-br from-[#c84e89] to-[#F15F79]`}>
              {submitBtnText}
            </button>
          </div>
        </div>
      </form>
    ),
    [indexIdEnable, isFetching, onFormSubmit, t, searchForm, searchFormError, submitBtnText]
  );
};
