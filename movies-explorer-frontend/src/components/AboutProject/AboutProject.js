function AboutProject() {
    return (
        <div className='project-info' id='about-project'>
            <div className='main__subtitle'>
                О проекте
            </div>

            <div className='project-info__main-text'>
                <div className='project-info__text-column'>
                    <h3 className='project-info__text-title'>Дипломный проект включал 5 этапов</h3>
                    <p className='project-info__text-description main__description-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className='project-info__text-column'>
                    <h3 className='project-info__text-title'>На выполнение диплома ушло 5 недель</h3>
                    <p className='project-info__text-description main__description-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className='project-info__work-line'>
                <div className='project-info__green-box'>
                    1 неделя
                </div>
                <div className='project-info__grey-box'>
                    4 недели
                </div>
            </div>
            <div className='project-info__work-line project-info__work-line_titles'>
                    <h5 className='project-info__backend-title'>Back-end</h5>
                    <h5 className='project-info__frontend-title'>Front-end</h5>

            </div>

        </div>
    )
}
export default AboutProject;