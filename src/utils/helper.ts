import { Request } from "express";

export function editUrl(url: string) {
  const urlEnd = url.split('/').pop() as string;
  const filterUrl = url.split(urlEnd)[0];
  return filterUrl;
};

export function getHost(req: Request) {
  if (req.protocol === 'https') {
    return req.protocol + '://' + req.get('host');
  }

  return req.protocol + "s" + '://' + req.get('host');
};