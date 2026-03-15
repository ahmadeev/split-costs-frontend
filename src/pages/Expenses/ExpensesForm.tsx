import '../../components/FormLayout/FormLayout.css';
import './ExpensesForm.css';
import { type ChangeEvent, useEffect, useState } from 'react';
import FormLayout from '../../components/FormLayout/FormLayout.tsx';
import SelectInput from '../../ui/SelectInput/SelectInput.tsx';
import SegmentedControl from '../../ui/SegmentedControl/SegmentedControl.tsx';
import Button from '../../ui/Button/Button.tsx';
import TextInput from '../../ui/TextInput/TextInput.tsx';
import type { MemberResponseDTO } from '../../api/member/dto.ts';
import type { Group, GroupResponseDTO } from '../../api/group/dto.ts';
import type { CreateExpenseMemberDto } from '../../api/expenseMember/dto.ts';
import { useQuery } from '@tanstack/react-query';
import { groupService } from '../../api/group/service.ts';
import type { Option } from '../../types/types.ts';
import { expenseMemberService } from '../../api/expenseMember/service.ts';

type Checks = Record<string, boolean>;
interface DividedSum { fraction: number, ways: number }

const CURRENCY_SUFFIX = '₽';
const NUMBER_REGEX = /^\d*$/;

const getFractionsAndWays = (total: number, checkStates: Checks): DividedSum => {
    const numberOfChecked = Object.values(checkStates).reduce((acc, value) => {
        return value ? acc + 1 : acc;
    }, 0);

    if (!numberOfChecked || !total) {
        return { fraction: 0, ways: 0 };
    }

    return { fraction: Math.round(total / numberOfChecked * 100) / 100, ways: numberOfChecked };
};

const getHintString = (total: number, checkStates: Checks): string => {
    const result: DividedSum = getFractionsAndWays(total, checkStates);

    if (!result.fraction || !result.ways) {
        return '';
    }

    return `${Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 }).format(result.fraction)} ${CURRENCY_SUFFIX} × ${String(result.ways)} чел.`;
};

const validateTotalChange = (e: ChangeEvent<HTMLInputElement>) => {
    return NUMBER_REGEX.test(e.target.value);
};

const cleanTotalValue = (total: string) => {
    return total.replace(CURRENCY_SUFFIX, '').replaceAll(/\s+/g, '');
};

const SEGMENTED_CONTROL_OPTIONS = [
    { name: 'Разделить на всех' },
    { name: 'Выбрать из списка' },
];

export default function ExpensesForm() {
    const [total, setTotal] = useState('');

    const handleTotalChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (validateTotalChange(e)) {
            setTotal(e.target.value);
        }
    };

    const { data: groups = [] } = useQuery<Group[]>({
        queryKey: ['groups'],
        queryFn: () => groupService.getAll(),
    });

    const [group, setGroup] = useState<Group | null>(groups.length ? groups[0] : null);

    useEffect(() => {
        if (groups.length) {
            setGroup(groups[0]);
        }
    }, [groups]);

    const [isDividedEvenly, setIsDividedEvenly] = useState<boolean>(true);

    const [checksState, setChecksState] = useState<Checks>(() => {
        if (!group) {
            return {};
        }

        return group.members.reduce((acc: Checks, value: MemberResponseDTO) => {
            return { ...acc, [value.name]: true };
        }, {});
    });

    const handleCheckStateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const elementName = e.target.name;

        setChecksState({ ...checksState, [elementName]: !checksState[elementName] });
    };

    // todo: не обновляется c useMemo
    const hintString = getHintString(+cleanTotalValue(total), checksState);

    const [details, setDetails] = useState('');

    const handleDetailsInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setDetails(e.target.value);
    };

    const handleSelectChange = (id: number) => {
        const group = groups.find((group: GroupResponseDTO) => group.id === id) as GroupResponseDTO;

        setGroup(group);

        setChecksState(() => {
            return group.members.reduce((acc: Checks, value: MemberResponseDTO) => {
                return { ...acc, [value.name]: isDividedEvenly };
            }, {});
        });
    };

    const isSubmitDisabled = (() => {
        const isAnyChosen: boolean = Object.values(checksState).some((value: boolean) => value);

        return !details || !total || (!isDividedEvenly && !isAnyChosen);
    })();

    const handleFocusInputTotal = () => {
        setTotal(prev => cleanTotalValue(prev));
    };

    const handleBlurInputTotal = () => {
        setTotal(prev => prev ? `${Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(+prev)} ${CURRENCY_SUFFIX}` : '');
    };

    const handleSubmitClick = () => {
        if (!group) {
            return;
        }

        const checkedMembersSet = new Set<string>(Object.keys(checksState).filter(name => checksState[name]));

        const expenseMember: CreateExpenseMemberDto = {
            expense: {
                total: +cleanTotalValue(total),
                details: details,
            },
            members: group.members.filter(member => checkedMembersSet.has(member.name)),
        };

        expenseMemberService.create(expenseMember)
            .then(() => {
                setTotal('');
                setDetails('');
                // setGroup(groups[0]);
                setIsDividedEvenly(true);
                setSegmentedControlOption(SEGMENTED_CONTROL_OPTIONS[0]);
                setChecksState(() => {
                    if (!group) {
                        return {};
                    }

                    return group.members.reduce((acc: Checks, value: MemberResponseDTO) => {
                        return { ...acc, [value.name]: true };
                    }, {});
                });
            })
            .catch((error: unknown) => {
                console.error('Ошибка при создании траты', error);
            });
    };

    const setChecksToState = (newState: boolean) => {
        setChecksState((): Checks => {
            return Object.keys(checksState).reduce((acc: Checks, name: string) => {
                return { ...acc, [name]: newState };
            }, {});
        });
    };

    const [segmentedControlOption, setSegmentedControlOption] = useState(SEGMENTED_CONTROL_OPTIONS[0]);

    return (
        <FormLayout>
            <div className="form-layout__section">
                <TextInput
                    title={'Комментарий'}
                    isMandatory={true}
                    onChange={handleDetailsInput}
                    value={details}
                    placeholder={'Например, пицца'}
                />
                <TextInput
                    title={'Сумма'}
                    isMandatory={true}
                    onChange={handleTotalChange}
                    value={total}
                    placeholder={'9 000 ₽'}
                    onFocus={handleFocusInputTotal}
                    onBlur={handleBlurInputTotal}
                    inputMode={'numeric'}
                />
                {hintString && (
                    <div
                        style={{
                            color: 'var(--secondary-color)',
                            textAlign: 'left',
                            padding: '0.6rem 1.2rem',
                        }}
                    >
                        <span>{hintString}</span>
                    </div>
                )}
            </div>

            <div className="form-layout__section">
                <span style={{ textAlign: 'left', color: 'var(--secondary-color)' }}>Группа</span>
                <div>
                    <SelectInput
                        displayValue={group?.name}
                        options={groups.map((group: Group) => ({ id: group.id, name: group.name } as Option))}
                        onChange={handleSelectChange}
                        placeholder={'Выберите группу'}
                    />
                </div>

                <SegmentedControl
                    options={SEGMENTED_CONTROL_OPTIONS}
                    value={segmentedControlOption}
                    onChange={(option: Option) => {
                        setSegmentedControlOption(option);

                        setChecksState((): Checks => {
                            return Object.keys(checksState).reduce((acc: Checks, name: string) => {
                                return { ...acc, [name]: !isDividedEvenly };
                            }, {});
                        });

                        setIsDividedEvenly((prev: boolean) => !prev);
                    }}
                />

                {
                    !isDividedEvenly && (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            gap: '1rem',
                            padding: '0.6rem 1.2rem',
                        }}>
                            <Button
                                type={'link'}
                                title={'Выбрать всех'}
                                onClick={() => { setChecksToState(true); }}
                            />
                            <Button
                                type={'link'}
                                title={'Сбросить'}
                                onClick={() => { setChecksToState(false); }}
                            />
                        </div>
                    )
                }

                {
                    isDividedEvenly || !group ? (
                        <></>
                    ) : (
                        group.members.map((member: MemberResponseDTO, index: number) => (
                            <div className='form-layout__row form-layout__row_bordered' key={index}>
                                <label style={{ cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        name={member.name}
                                        onChange={handleCheckStateChange}
                                        checked={checksState[member.name] ?? false}
                                        style={{ margin: '1rem', cursor: 'pointer' }}
                                    />
                                    <span>{member.name}</span>
                                </label>
                            </div>
                        ))
                    )
                }
            </div>

            <div className="form-layout__section">
                <Button
                    type={'primary'}
                    title={'Сохранить'}
                    isDisabled={isSubmitDisabled}
                    onClick={handleSubmitClick}
                />
            </div>
        </FormLayout>
    );
}
