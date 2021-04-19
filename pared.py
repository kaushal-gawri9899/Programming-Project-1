

from pyresparser import ResumeParser
data = ResumeParser('resume.pdf').get_extracted_data()
print(data)
