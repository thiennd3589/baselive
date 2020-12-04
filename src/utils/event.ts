import { EventInfo, Obj } from "interfaces/common";

export const handleEventInfoForRequest = (eventInfo: EventInfo) => {
  return {
    id: eventInfo.id,
    title: eventInfo.title,
    categoryTypeId: (eventInfo.categoryType as Obj).id,
    categoryId: (eventInfo.category as Obj).id,
    subCategoryId: null,
    tags: eventInfo.tags.join(","),
    organizerId: null,
    startDate: eventInfo.eventStart,
    endDate: eventInfo.eventEnd,
    startTime: eventInfo.startTime,
    endTime: eventInfo.endTime,
    eventImage: eventInfo.eventImage,
    summary: eventInfo.summary,
    description: eventInfo.description,
    status: 1,
    publishDate: eventInfo.publishDate,
    publishTime: eventInfo.publishTime,
    googleSlideUrl: eventInfo.googleSlideUrl,
    livestreamUrl: eventInfo.livestreamUrl,
    adsImage: eventInfo.livestreamUrl,
    adsTitle: eventInfo.adsUrl,
    adsUrl: eventInfo.adsUrl,
    organizerList: [],
    documentList: [],
  };
};
