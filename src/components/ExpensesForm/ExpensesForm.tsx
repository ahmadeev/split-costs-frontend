import '../FormLayout/FormLayout.css';
import './ExpensesForm.css';
import { type ChangeEvent, type SyntheticEvent, useEffect, useState } from 'react';
import FormLayout from '../FormLayout/FormLayout.tsx';
import type { Expense, GroupResponseDTO, MemberResponseDTO } from '../../types/types.ts';
import SelectInput from '../../ui/SelectInput/SelectInput.tsx';
import SegmentedControl from '../../ui/SegmentedControl/SegmentedControl.tsx';

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

    return `${String(result.fraction)} ${CURRENCY_SUFFIX} × ${String(result.ways)} чел.`;
};

const validateTotalChange = (e: ChangeEvent<HTMLInputElement>) => {
    return NUMBER_REGEX.test(e.target.value);
};

const cleanTotalValue = (total: string) => {
    return total.replace(CURRENCY_SUFFIX, '').replaceAll(/\s+/g, '');
};

const handleEditClick = (e: SyntheticEvent<HTMLElement>): void => {
    const el = e.currentTarget.querySelector('input[type="text"]') as HTMLInputElement;

    el.focus();
};

const GROUP: GroupResponseDTO = {
    id: 1,
    name: 'Buhaem v pyatnicu',
    members: [
        {
            id: 1,
            name: 'Леша',
        },
        {
            id: 2,
            name: 'Саша',
        },
        {
            id: 3,
            name: 'Ваня',
        },
        {
            id: 4,
            name: 'Дима',
        },
        {
            id: 5,
            name: 'Тима',
        },
        {
            id: 6,
            name: 'Фая',
        },
    ],
};

const GROUP_2: GroupResponseDTO = {
    id: 2,
    name: 'веселые посиделки',
    members: [
        {
            id: 1,
            name: 'Леша',
        },
    ],
};

const GROUPS: GroupResponseDTO[] = [GROUP, GROUP_2];

export default function ExpensesForm() {
    const [total, setTotal] = useState('');

    const handleTotalChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (validateTotalChange(e)) {
            setTotal(e.target.value);
        }
    };

    const [group, setGroup] = useState<GroupResponseDTO>(GROUPS[0]);

    const [isDividedEvenly, setIsDividedEvenly] = useState<boolean>(true);

    const [checksState, setChecksState] = useState<Checks>(() => {
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
        const group: GroupResponseDTO = GROUPS.find((group: GroupResponseDTO) => group.id === id)!;

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

    const handleSegmentedControlChange = () => {
        setChecksState((): Checks => {
            return Object.keys(checksState).reduce((acc: Checks, name: string) => {
                return { ...acc, [name]: !isDividedEvenly };
            }, {});
        });

        setIsDividedEvenly((prev: boolean) => !prev);
    };

    useEffect(() => {
        const input = document.querySelector('input[name="input-total"]') as HTMLInputElement;

        const handleFocus = () => {
            setTotal(prev => cleanTotalValue(prev));
        };

        const handleBlur = () => {
            setTotal(prev => prev ? `${Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(+prev)} ${CURRENCY_SUFFIX}` : '');
        };

        input.addEventListener('focus', handleFocus);
        input.addEventListener('blur', handleBlur);

        return () => {
            input.removeEventListener('focus', handleFocus);
            input.removeEventListener('blur', handleBlur);
        };
    }, []);

    return (
        <FormLayout>
            <span style={{ textAlign: 'left' }}>Комментарий</span>
            <div
                className='form-layout__row form-layout__row_bordered form-layout__row_header-input'
                onClick={handleEditClick}
            >
                <input
                    type="text"
                    className='form-layout__text-input_invisible-border form-layout__text-input_header'
                    placeholder='Например, пицца'
                    onChange={handleDetailsInput}
                />
            </div>
            <span style={{ textAlign: 'left' }}>Сумма</span>
            <div
                className='form-layout__row form-layout__row_bordered form-layout__row_header-input'
                onClick={handleEditClick}
            >
                <input
                    type="text"
                    name='input-total'
                    className='form-layout__text-input_invisible-border form-layout__text-input_header'
                    placeholder='9000 ₽'
                    value={total}
                    onChange={handleTotalChange}
                />
            </div>

            {hintString && (
                <div className={'form-layout__row'}>
                    <span>{hintString}</span>
                </div>
            )}

            <hr style={{ color: 'black', height: '1px' }}/>

            <span style={{ textAlign: 'left' }}>Группа</span>
            <div>
                <SelectInput options={GROUPS} defaultValue={group} handler={handleSelectChange}/>
            </div>

            <SegmentedControl
                options={[
                    { name: 'Разделить на всех', handler: handleSegmentedControlChange },
                    { name: 'Выбрать из списка', handler: handleSegmentedControlChange },
                ]}
                defaultOption={isDividedEvenly ? { name: 'Разделить на всех', handler: handleSegmentedControlChange } : { name: 'Выбрать из списка', handler: handleSegmentedControlChange }}
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
                        <button
                            className='form-layout__button-link'
                            onClick={() => {
                                setChecksState((): Checks => {
                                    return Object.keys(checksState).reduce((acc: Checks, name: string) => {
                                        return { ...acc, [name]: true };
                                    }, {});
                                });
                            }}
                        >Выбрать всех</button>
                        <button
                            className='form-layout__button-link'
                            onClick={() => {
                                setChecksState((): Checks => {
                                    return Object.keys(checksState).reduce((acc: Checks, name: string) => {
                                        return { ...acc, [name]: false };
                                    }, {});
                                });
                            }}
                        >Сбросить</button>
                    </div>
                )
            }

            {
                isDividedEvenly ? (
                    <></>
                ) : (
                    group.members.map((member: MemberResponseDTO, index: number) => (
                        <div className='form-layout__row form-layout__row_bordered' key={index}>
                            <label style={{ cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    name={member.name}
                                    onChange={handleCheckStateChange}
                                    checked={checksState[member.name]}
                                    style={{ margin: '1rem', cursor: 'pointer' }}
                                />
                                <span>{member.name}</span>
                            </label>
                        </div>
                    ))
                )
            }

            <hr style={{ color: 'black', height: '1px' }}/>

            <button
                className='form-layout__button_primary form-layout__button_full-width'
                disabled={isSubmitDisabled}
                style={isSubmitDisabled ? { cursor: 'not-allowed' } : { cursor: 'pointer' }}
                onClick={() => {
                    const membersSet = new Set<string>(Object.keys(checksState).filter(name => checksState[name]));

                    const expense: Expense = {
                        total: +cleanTotalValue(total),
                        details: details,
                        group: group,
                        members: group.members.filter(member => membersSet.has(member.name)),
                    };

                    console.log(expense);
                }}
            >Сохранить
            </button>
        </FormLayout>
    );
}
