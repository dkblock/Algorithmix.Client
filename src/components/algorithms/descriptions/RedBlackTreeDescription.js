import React from "react";
import { Link } from "react-router-dom";
import AlgorithmTimeComplexity from "../AlgorithmTimeComplexity";
import { getFileSrc } from "../../../utils/get-file-src";
import routes from "../../../utils/routes";

const RedBlackTreeDescription = (props) => {
    const { algorithm: { timeComplexity } } = props;

    return (
        <>
            <div>
                <div className="description-container">
                    <div className="col-8">
                        <div className="description-paragraph">
                            <b>Красно-чёрное дерево</b> – один из видов самобалансирующихся двоичных деревьев поиска,
                            гарантирующих логарифмический рост высоты дерева от числа узлов и позволяющих быстро
                            выполнять
                            основные операции дерева поиска:
                            добавление, удаление и поиск узла.
                        </div>
                        <div className="description-paragraph">
                            Сбалансированность достигается за счёт введения дополнительного атрибута узла дерева —
                            «цвета».
                            Этот атрибут может принимать одно из двух возможных значений — «чёрный» или «красный».
                        </div>
                        <div className="description-paragraph">
                            Изобретателем красно-черного дерева считается немецкий ученый Рудольф Байер.
                            Название эта структура данных получила в статье Леонидаса Гимпаса и Роберта Седжвика 1978
                            года.
                        </div>
                    </div>
                    <div className="col-4">
                        <img
                            className="description-image"
                            src={getFileSrc("images/algorithms/red-black-tree.png")}
                            alt="red-black-tree"
                        />
                    </div>
                </div>
            </div>
            <div>
                <h3 className="description-section-title">Свойства</h3>
                <hr/>
                <div className="description-container">
                    <div className="col-8">
                        <div className="description-paragraph">
                            Красно-чёрное дерево удовлетворяет следующим свойствам:

                            <ol>
                                <li>Каждый узел является красным либо чёрным.</li>
                                <li>Корень дерева является чёрным.</li>
                                <li>Каждый лист дерева является чёрным.</li>
                                <li>Если узел – красный, то оба его дочерних узла – чёрные.</li>
                                <li>Для каждого узла все пути от него до листьев, являющихся потомками данного узла,
                                    содержат одно и то же количество чёрных узлов.
                                </li>
                            </ol>
                        </div>
                        <div className="description-paragraph">
                            Эти ограничения реализуют критическое свойство красно-чёрных
                            деревьев: путь от корня до самого дальнего листа не более чем в два раза длиннее
                            пути от корня до ближайшего листа. Результатом является то, что дерево
                            приближённо сбалансировано.
                        </div>
                        <div className="description-paragraph">
                            Все листья красно-чёрного дерева являются фиктивными и не содержат данных, но относятся к
                            дереву
                            и являются чёрными.
                            При работе с данным деревом в целях экономии памяти все листья следует заменить одним
                            ограничивающим узлом,
                            представляющим собой объект с теми же полями, что и обычный узел дерева, и имеющим чёрный
                            цвет.
                        </div>
                        <div className="description-paragraph">
                            <b>Чёрная высота узла</b> - количество чёрных узлов на пути от узла Х (не считая сам узел) к
                            листу.
                            В соответствии со свойством 5 красно-чёрных деревьев, чёрная высота узла – точно
                            определяемое
                            значение.<br/>
                            <b>Чёрная высота дерева</b> - чёрная высота его корня. Чёрная высота дерева на примере
                            равняется
                            1.
                        </div>
                        <div className="description-paragraph">
                            Высота в красно-чёрном дереве ограничена логарифмически. Доказано, что красно-чёрное дерево
                            с N
                            внутренними узлами имеет высоту не
                            более чем 2lg(N + 1).
                        </div>
                    </div>
                    <div className="col-4">
                        <AlgorithmTimeComplexity complexity={timeComplexity}/>
                        <div className="description-title"/>
                        <img
                            className="description-image"
                            src={getFileSrc("images/descriptions/red-black-tree/example.png")}
                            alt="red-black-tree example"
                        />
                        <h6 className="text-center">Простой пример красно-чёрного дерева</h6>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="description-section-title">Основные операции</h3>
                <hr/>
                <div className="description-container">
                    <div className="col-12">
                        <div className="description-paragraph">
                            Поиск узла в красно-чёрном дереве аналогичен поиску в обычном бинарном дереве. Однако в
                            результате операций вставки и удаления
                            происходит изменения структуры дерева, из-за чего могут нарушаться его красно-чёрные
                            свойства.
                            Для восстановления этих
                            свойств необходимо изменить цвета некоторых узлов дерева, а также структуру их указателей.
                            При
                            этом применяются повороты, аналогичные
                            поворотам в <Link to={`${routes.algorithms}/avl-tree`}>AVL-дереве</Link>.
                            Рассмотрим вставку нового элемента более подробно.
                        </div>
                    </div>
                </div>
                <div className="description-container">
                    <div className="col-6">
                        <h5>Вставка элемента</h5>
                        <div className="description-paragraph">
                            Вставка нового узла в красно-чёрное дерево происходит так, как если бы это было обычное
                            бинарное
                            дерево поиска,
                            а затем этот узел окрашивается в красный цвет. Но если в бинарном дереве поиска всегда
                            добавляется лист, то в
                            красно-чёрном дереве листья не содержат данных, поэтому добавляется красный внутренний узел
                            с
                            двумя чёрными потомками на место
                            чёрного листа. Что происходит дальше – зависит от цвета ближайших узлов. Возможны несколько
                            случаев нарушения свойств
                            красно-чёрного дерева при вставке нового элемента:

                            <ol>
                                <li>
                                    Пусть Z – новый узел, он красный по определению. Его родитель P –
                                    красный, P является левым потомком узла G, который является чёрным. «Дядя»
                                    U (т.е. брат родительского узла) элемента Z – красный. Тогда нарушается
                                    свойство 4, так как красный узел P не может иметь красного потомка Z.
                                    Восстанавливаем свойства дерева следующим образом: перекрашиваем узлы P и
                                    U в чёрный, а G в красный.
                                </li>
                                <li>
                                    Пусть Z – левый дочерний элемент узла P, P – красный, G – чёрный, U –
                                    чёрный. При этом нарушается свойство 4. Если выполнить только
                                    перекрашивание, то может нарушиться постоянство чёрной высоты дерева по
                                    всем ветвям, поэтому выполняем правый поворот дерева G, при этом
                                    перекрашивая P в чёрный, а G в красный.
                                </li>
                                <li>
                                    Пусть Z – правый дочерний элемент узла P, P – красный, G – чёрный, U –
                                    чёрный. При этом также нарушается свойство 4. Выполняем левый поворот
                                    дерева P и переходим к случаю 2.
                                </li>
                            </ol>
                        </div>
                        <div className="description-paragraph">
                            <i>Примечание 1</i>: в каждом из случаев узел Z является узлом, который
                            необходимо вставить, P – его родитель, U – «дядя», G – родитель узла P; a, b, c –
                            произвольные поддеревья. При этом узел P является <i>левым</i> дочерним элементом
                            узла G.
                        </div>
                        <div className="description-paragraph">
                            <i>Примечание 2</i>: случаи 4-6 симметричны случаям 1-3: P является <i>правым</i> дочерним
                            элементом узла G. При этом при вставке правила перекрашивания
                            остаются теми же, левый поворот заменяется правым, и наоборот.
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="description-title"/>
                        <img
                            className="description-image"
                            src={getFileSrc("images/descriptions/red-black-tree/insert1.png")}
                            alt="red-black-tree insert"
                        />
                        <h6 className="text-center">Случай 1</h6>
                        <div className="description-title"/>
                        <img
                            className="description-image"
                            src={getFileSrc("images/descriptions/red-black-tree/insert2.png")}
                            alt="red-black-tree insert"
                        />
                        <h6 className="text-center">Случай 2</h6>
                        <div className="description-title"/>
                        <img
                            className="description-image"
                            src={getFileSrc("images/descriptions/red-black-tree/insert3.png")}
                            alt="red-black-tree insert"
                        />
                        <h6 className="text-center">Случай 3</h6>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RedBlackTreeDescription;