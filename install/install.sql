CREATE TABLE IF NOT EXISTS `googlecalendar_settings` (
    `idx` int(11) NOT NULL AUTO_INCREMENT,
    `seq` int(11) NOT NULL,
    `feed_url` blob ,
    `start_date` int (11),
    `end_date` int (11),
    `max_event` varchar (270),
    `event_style` blob ,
    `date_created` int (90),
    PRIMARY KEY (`idx`)
); 

