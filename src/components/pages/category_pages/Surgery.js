import React from 'react'
import CategoryPage from './../CategoryPage'
import Paragraph from './../../common/Paragraph'

const Surgery = props => {
  const renderContent = () => (
    <div>
      <Paragraph>
        Сегодня красивая открытая улыбка - неотъемлемая часть имиджа успешного
        человека. Ведь с помощью улыбки мы не только выражаем свои эмоции, но и
        располагаем к себе людей. Многие люди стесняются широко улыбаться, -
        причины тому могут быть разные, - но в подавляющем большинстве случаев, -
        это неровные зубы. Неровные зубы и неправильный прикус могут стать
        причиной различных психологических проблем, всевозможных комплексов.
      </Paragraph>
      <Paragraph>
        "Кривые" зубы значительно труднее прочищаются. А недостаточно
        качественная гигиена полости рта является основной причиной
        возникновения кариеса. Неправильный прикус является причиной
        возникновения и более быстрого прогрессирования таких заболеваний как
        пародонтит и пародонтоз. Множественные клиновидные дефекты, доставляющие
        столько неприятных болевых моментов во время приема холодной или кислой
        пищи, часто образуются при неправильном прикусе. Другое грозное
        осложнение неправильного прикуса - это заболевания
        височно-нижнечелюстного сустава (ВНЧС), самого сложного сустава нашего
        организма. Пациенты с дисфункцией ВНЧС часто жалуются на хруст, щелканье
        и боль в суставе, на напряжение и болезненность в области жевательных
        мышц, частые головные боли. Патологическая стираемость затрудняет, а
        иногда делает невозможным протезирование.
      </Paragraph>
      <Paragraph>
        Первый визит врачу-ортодонту целесообразно нанести в возрасте 5-6 лет,
        до начала смены молочных зубов на постоянные. Ведь нередко в том, что у
        ребенка неправильно развиваются челюсти и неровные зубы виноваты
        родители, которые не обращают внимание на так называемые "вредные
        привычки" малыша - сосание пальца, закусывание губы, ротовое дыхание и
        т.д. Если вовремя обратить на это внимание и приложить незначительные
        усилие, посетив врача-ортодонта, то в дальнейшем удастся избежать
        серьезных проблем с прикусом и длительного ортодонтического лечения.
      </Paragraph>
      <Paragraph>
        Стоит показать своего малыша врачу-ортодонту и в том случае, если у
        ребенка в возрасте 5-6 лет между молочными зубами нет ни единой щелочки:
        ведь на их место должны будут встать постоянные зубки, которые в 1,5
        раза крупнее своих предшественников.
      </Paragraph>
    </div>
  )

  const renderAside = (doctor) => null

  return (
    <CategoryPage
      categoryId='5aa0112f0c8d66733cd7524f'
      doctors={['5aa2f65091ce0038c42499d0', '5aa2f77791ce0038c42499d6']}
      renderContent={renderContent}
      renderAside={renderAside}
    />
  )
}

export default Surgery
